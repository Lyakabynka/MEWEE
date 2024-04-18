import React, { useEffect } from "react";
import { useAuthStore } from "../../../entities";
import { Navigate } from "react-router-dom";
import { EnumUserRole } from "../../../entities";
import { LoginForm } from "../../../features/exportFeaturesComponents";
import { Box } from "@mui/material";
import { IAuthPageProps } from "../IAuthPageProps";

export const LoginPage: React.FC<IAuthPageProps> = ({ setActiveAuthNav }) => {
  useEffect(() => {
    setActiveAuthNav(true);
  });

  const { isLoggedIn } = useAuthStore();

  if (isLoggedIn) {
    return <Navigate to="/feed" />;
  }

  return <LoginForm />;
};
