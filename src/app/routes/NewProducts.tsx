import { useTranslation } from 'react-i18next';
import { PageWrapper } from '../../shared/ui/layout/PageWrapper';
import ProductList from '../../widgets/ProductList';

const NewProducts = () => {
  const { t } = useTranslation();
  return (
    <PageWrapper>
      <div className="flex font-medium  flex-col gap-6 items-center mb-8 text-center">
        <h1 className="text-5xl text-interactive">{t('newProducts.header')}</h1>
        <h4 className="max-w-[700px]">{t('newProducts.description')}</h4>
      </div>
      <ProductList filters={{ isNew: true }} showNewBadge={false} />
    </PageWrapper>
  );
};

export default NewProducts;
