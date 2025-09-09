import React from 'react';
import { PageWrapper } from '../../shared/ui/layout/PageWrapper';
import ErrorMessage from '../../shared/ui/atoms/ErrorMessage';
import { withTranslation, type WithTranslation } from 'react-i18next';

type AppErrorBoundaryProps = WithTranslation & {
  children: React.ReactNode;
  onError?: (error: Error, info: React.ErrorInfo) => void;
  onReset?: () => void;
};

type AppErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
};

export class AppErrorBoundaryBase extends React.Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  state: AppErrorBoundaryState = { hasError: false };
  static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    if (import.meta.env.DEV) {
      console.error('Error caught by AppErrorBoundary:', error, info);
    }
    this.props.onError?.(error, info);
  }

  render() {
    const { t } = this.props;
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <PageWrapper className="h-screen flex  items-center justify-center ">
        <ErrorMessage message={t('error.defaultMessage')} />

        {import.meta.env.DEV && this.state.error && (
          <pre className="max-w-full overflow-auto rounded bg-black/80 text-white text-xs p-3">
            {String(this.state.error?.stack ?? this.state.error?.message)}
          </pre>
        )}
      </PageWrapper>
    );
  }
}

export const AppErrorBoundary = withTranslation()(AppErrorBoundaryBase);
