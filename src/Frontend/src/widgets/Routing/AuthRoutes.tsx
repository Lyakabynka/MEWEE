import { useParams, Navigate } from 'react-router-dom';
import { LoginPage } from '../../pages/auth/LoginPage/LoginPage';
import { RegisterPage } from '../../pages/auth/RegisterPage';
import { AuthPage } from '../../pages';

export const AuthRoutes = () => {
  const { url } = useParams();

  function getChild(){
    switch (url) {
      case 'login':
        return <LoginPage />;
      case 'register':
        return <RegisterPage />;
      default:
        return <RegisterPage />;
    }
  }

  return <AuthPage>{getChild()}</AuthPage>;
};
