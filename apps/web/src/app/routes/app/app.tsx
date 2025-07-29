import { useTranslation } from 'react-i18next';

export const AppRoute = () => {
  const { t } = useTranslation();
  return <div>{t('welcome')}</div>;
};
