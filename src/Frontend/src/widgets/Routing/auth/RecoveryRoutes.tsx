import { useParams } from 'react-router-dom';
import { AuthLayout } from '../../../pages';
import { RecoveryEmailForm, RecoveryPhoneForm } from '../../../features/auth/RecoveryForms';
import { useTranslation } from 'react-i18next';

export const RecoveryRoutes = () => {
  const { url } = useParams();
  const { t } = useTranslation();

  function getChild() {
    switch (url) {
      case 'email':
        return <RecoveryEmailForm />;
      case 'phone':
        return <RecoveryPhoneForm />;
      default:
        return <RecoveryEmailForm />;
    }
  }

  return (
    <></>
      // <AuthLayout>
      //   <span>{t('password_change')}</span>
      //   {getChild()}
      //   </AuthLayout>
  );
  };
