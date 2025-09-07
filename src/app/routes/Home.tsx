import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  return <div>{t('home.welcome')}</div>;
};

export default Home;
