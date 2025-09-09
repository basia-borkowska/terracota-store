import { PageWrapper } from '../../shared/ui/layout/PageWrapper';
import NewProductsCarousel from '../../widgets/carousels/NewProductsCarousel';
import DiscountedProductsCarousel from '../../widgets/carousels/DiscountedProductsCarousel';

const Home = () => {
  return (
    <>
      <img className="-mt-navbar" src="/images/hero.png" alt="Hero" />
      <PageWrapper>
        <NewProductsCarousel />
      </PageWrapper>
      <img className="w-full" src="/images/home_banner.png" alt="Hero" />

      <PageWrapper>
        <DiscountedProductsCarousel />
      </PageWrapper>
    </>
  );
};

export default Home;
