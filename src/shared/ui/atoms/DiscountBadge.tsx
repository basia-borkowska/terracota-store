import { useTranslation } from 'react-i18next';
import { Badge } from './Badge';

const DiscountBadge = ({ className }: { className?: string }) => {
  const { t } = useTranslation();
  return (
    <Badge variant="blue" className={className}>
      {t('atoms.discountBadge.title')}
    </Badge>
  );
};

export default DiscountBadge;
