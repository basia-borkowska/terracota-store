import { useTranslation } from 'react-i18next';
import { PageWrapper } from '../../shared/ui/layout/PageWrapper';

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      <img className="-mt-14" src="/images/hero.png" alt="Hero" />
      <img className="w-full" src="/images/home_banner.png" alt="Hero" />

      <PageWrapper className="h-screen flex flex-col mt-8 gap-8">
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
          {t('home.title')}
        </h1>
        <h4 className="scroll-m-20 text-center text-xl font-semibold tracking-tight">
          {t('home.subtitle')}
        </h4>
      </PageWrapper>
    </>
  );
};

export default Home;
