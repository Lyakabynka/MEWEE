import { useParams } from 'react-router-dom';
import { AuthLayout, RecoveryPage } from '../../../pages';

export const RecoveryRoutes = () => {
  const { url } = useParams();

  return (
    <>
      <AuthLayout isAuthNavActive={false}>
        <RecoveryPage url={url}></RecoveryPage>
      </AuthLayout>
    </>
  );
  };
