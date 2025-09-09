import { useTranslation } from 'react-i18next';
import { PageWrapper } from '../../shared/ui/layout/PageWrapper';
import ErrorMessage from '../../shared/ui/atoms/ErrorMessage';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <PageWrapper className="h-[calc(100vh-theme(spacing.navbar))] flex flex-col items-center justify-center text-center">
      <ErrorMessage message={t('error.pageNotFound')} />
    </PageWrapper>
  );
};
export default NotFoundPage;
