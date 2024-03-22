import { useParams } from 'react-router-dom';
import { LoginPage } from '../../../pages/auth/LoginPage/LoginPage';
import { RegisterPage } from '../../../pages/auth/RegisterPage'
import { AuthLayout } from '../../../pages';

export const AuthRoutes = () => {
  const { url } = useParams();

  function getChild() {
    switch (url) {
      case 'login':
        return <LoginPage />;
      case 'register':
        return <RegisterPage />;
      default:
        return <LoginPage />;
    }
  }

  return <AuthLayout>{getChild()}</AuthLayout>;
};
