import { useTranslation } from 'react-i18next';
import { useCategoryFilter } from '../model/useCategoryFilter';
import { categories, type Category } from '../../../entities/product/types';
import { Card, CardTitle } from '../../../shared/ui/atoms/Card';
import { ImageWithFallback } from '../../../shared/ui/molecules/ImageWithFallback';
import { Divider } from '../../../shared/ui/atoms/Divider';
import { FORCED_PLURAL_FORM } from '../../../shared/lib/constants';

const categoryImages: Record<Category, string> = {
  table: '/images/samples/table/1.webp',
  chair: 'images/samples/chair/1.webp',
  bed: '/images/samples/bed/1.webp',
  sofa: '/images/samples/sofa/1.webp',
  carpet: '/images/samples/carpet/1.webp',
  lamp: '/images/samples/lamp/1.webp',
};

export const CategoryFilterCards = () => {
  const { t } = useTranslation();
  const { selected, setCategory } = useCategoryFilter();

  if (selected) return null;

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Card
            key={category}
            className="cursor-pointer"
            onClick={() => setCategory(category)}
          >
            <ImageWithFallback
              className="h-32"
              src={categoryImages[category]}
              alt={t(`category.${category}`)}
            />
            <CardTitle className="uppercase pt-2 text-xs text-dark font-bold">
              {t(`category.${category}`, { count: FORCED_PLURAL_FORM })}
            </CardTitle>
          </Card>
        ))}
      </div>
      <Divider className="mt-4 mb-8" />
    </>
  );
};
