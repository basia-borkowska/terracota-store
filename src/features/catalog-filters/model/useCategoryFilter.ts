import {
  parseString,
  useQueryParam,
} from '../../../shared/hooks/useQueryParams';
import { categories, type Category } from '../../../entities/product/types';
import { useMemo } from 'react';

const allowed = categories as readonly string[];

export const useCategoryFilter = () => {
  const [query, setQuery] = useQueryParam<Category | null>('category', {
    parse: (raw) => {
      const value = parseString(raw);
      return value && allowed.includes(value) ? (value as Category) : null;
    },
    serialize: (val) => (val ? val : ''),
    replace: true,
  });

  const selected = query;

  const setCategory = (next: Category) => {
    if (selected === next) setQuery(null);
    else setQuery(next);
  };

  const clearCategory = () => setQuery(null);

  const isSelected = (c: Category) => selected === c;

  return useMemo(
    () => ({ selected, setCategory, clearCategory, isSelected }),
    [selected]
  );
};
