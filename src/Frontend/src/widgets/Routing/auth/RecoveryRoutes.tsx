import { useParams } from "react-router-dom";
import { AuthLayout } from "../../../pages/exportPageComponents";
import { RecoveryPage } from "../../../pages/auth/RecoveryPage/RecoveryPage";

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
