import { useParams } from "react-router-dom";
import { LoginPage } from "../../../pages/auth/LoginPage/LoginPage";
import {
  AuthLayout,
  LogoutPage,
  RegisterPage,
} from "../../../pages/exportPageComponents";
import { useState } from "react";

export const AuthRoutes = () => {
  const { url } = useParams();

  const [isAuthNavActive, setActiveAuthNav] = useState(true);

  function getChild() {
    switch (url) {
      case "login":
        return <LoginPage setActiveAuthNav={setActiveAuthNav} />;
      case "register":
        return <RegisterPage setActiveAuthNav={setActiveAuthNav} />;
      case "logout":
        return <LogoutPage />;
      default:
        return <LoginPage setActiveAuthNav={setActiveAuthNav} />;
    }
  }

  return (
    <AuthLayout isAuthNavActive={isAuthNavActive}>{getChild()}</AuthLayout>
  );
};
