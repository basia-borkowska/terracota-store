import { cn } from '../../lib/utils';
import { useTranslation } from 'react-i18next';

interface ErrorMessageProps {
  message?: string;
  className?: string;
}

const ErrorMessage = ({ message, className }: ErrorMessageProps) => {
  const { t } = useTranslation();

  return (
    <div className={cn('flex items-center flex-col gap-4', className)}>
      <img src="/images/error.png" alt="Error" className="w-[800px]" />
      <span className="text-3xl font-medium text-center text-interactive">
        {message || t('error.defaultMessage')}
      </span>
    </div>
  );
};

export default ErrorMessage;
