import { useTranslation } from 'react-i18next';
import NavbarAction from './NavbarAction';

const NavbarLanguageSwitch = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'pl' : 'en';
    void i18n.changeLanguage(newLang);
  };

  return (
    <NavbarAction onClick={toggleLanguage}>
      {i18n.language.toUpperCase()}
    </NavbarAction>
  );
};

export default NavbarLanguageSwitch;
