import { useTranslation } from 'react-i18next';
import { Badge } from './Badge';

const NewInBadge = ({ className }: { className?: string }) => {
  const { t } = useTranslation();
  return (
    <Badge variant="green" className={className}>
      {t('atoms.newInBadge.title')}
    </Badge>
  );
};

export default NewInBadge;
