import { useTranslation } from 'react-i18next';
import { useCategoryFilter } from '../../features/catalog-filters/model/useCategoryFilter';
import { CategoryFilterCards } from '../../features/catalog-filters/ui/CategoryFilterCards';
import { PageWrapper } from '../../shared/ui/layout/PageWrapper';
import { Breadcrumbs } from '../../shared/ui/molecules/Breadcrumbs';

import ProductList from '../../widgets/ProductList';
import { FORCED_PLURAL_FORM } from '../../shared/lib/constants';

const Products = () => {
  const { selected } = useCategoryFilter();
  const { t } = useTranslation();

  const trail = selected
    ? [
        {
          label: t(`category.${selected}`, {
            count: FORCED_PLURAL_FORM,
          }),
        },
      ]
    : [];

  return (
    <PageWrapper>
      <Breadcrumbs className="mb-2" trail={trail} />
      <CategoryFilterCards />
      <ProductList filters={{ category: selected ?? undefined }} />
    </PageWrapper>
  );
};

export default Products;
