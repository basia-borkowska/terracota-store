import { get, set } from 'idb-keyval';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const IDB_KEY = 'wishlist.ids';
const LS_KEY = 'wishlist.ids'; // migrate from here if present
const CHANNEL = 'wishlist-sync'; // cross-tab sync

function safeParse(value: string | null): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as string[]) : [];
  } catch {
    return [];
  }
}

export const useWishList = () => {
  const [ids, setIds] = useState<string[]>([]);
  const initedRef = useRef(false);

  // initial load + one-time migration from localStorage if present
  useEffect(() => {
    let mounted = true;
    (async () => {
      const fromIDB = await get<string[]>(IDB_KEY);
      let next = Array.isArray(fromIDB) ? fromIDB : [];

      // migrate once if IDB empty and LS has data
      if (!next.length) {
        const fromLS = safeParse(localStorage.getItem(LS_KEY));
        if (fromLS.length) {
          next = fromLS;
          await set(IDB_KEY, next);
          // optional: clean LS after migration
          try {
            localStorage.removeItem(LS_KEY);
          } catch {}
        }
      }

      if (mounted) {
        setIds(next);
        initedRef.current = true;
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // BroadcastChannel to sync across tabs
  useEffect(() => {
    if (!('BroadcastChannel' in window)) return;
    const bc = new BroadcastChannel(CHANNEL);
    bc.onmessage = (e) => {
      if (Array.isArray(e.data)) setIds(e.data as string[]);
    };
    return () => bc.close();
  }, []);

  const publish = (next: string[]) => {
    if ('BroadcastChannel' in window) {
      const bc = new BroadcastChannel(CHANNEL);
      bc.postMessage(next);
      bc.close();
    }
  };

  const write = useCallback(
    async (updater: (prev: string[]) => string[]) => {
      // ensure we have initialized before writes
      const prev = initedRef.current
        ? ids
        : ((await get<string[]>(IDB_KEY)) ?? []);
      const next = updater(prev);
      setIds(next);
      await set(IDB_KEY, next);
      publish(next);
    },
    [ids]
  );

  const add = useCallback(
    (id: string) => {
      void write((prev) => (prev.includes(id) ? prev : [...prev, id]));
    },
    [write]
  );

  const remove = useCallback(
    (id: string) => {
      void write((prev) => prev.filter((x) => x !== id));
    },
    [write]
  );

  const toggle = useCallback(
    (id: string) => {
      void write((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    },
    [write]
  );

  const clear = useCallback(() => {
    void write(() => []);
  }, [write]);

  const isFavourite = useCallback((id: string) => ids.includes(id), [ids]);

  return useMemo(
    () => ({
      ids,
      isFavourite,
      add,
      remove,
      toggle,
      clear,
      isReady: initedRef.current,
    }),
    [ids, isFavourite, add, remove, toggle, clear]
  );
};
