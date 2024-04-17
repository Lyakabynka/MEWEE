import React, { useEffect, useState } from "react";
import {
  EnumRegisterationStage,
  EnumUserRole,
  useAuthStore,
} from "../../../entities";
import { Navigate, useNavigate } from "react-router-dom";
import {
  EmailConfirmationForm,
  PreferencesForm,
  RegisterForm,
} from "../../../features/exportFeaturesComponents";
import path from "path";
import { IAuthPageProps } from "../IAuthPageProps";

export const RegisterPage: React.FC<IAuthPageProps> = ({
  setActiveAuthNav,
}) => {
  const { role, isLoggedIn } = useAuthStore();
  const [currentStage, setCurrentStage] = useState<EnumRegisterationStage>(
    EnumRegisterationStage.Main
  );

  const handleStageProgression = () =>
    setCurrentStage((prevStage) => prevStage + 1);
  const handleBack = () => setCurrentStage(EnumRegisterationStage.Main);

  useEffect(() => {
    setActiveAuthNav(currentStage === EnumRegisterationStage.Main);
  }, [currentStage, setActiveAuthNav]);

  if (isLoggedIn) {
    switch (role) {
      case EnumUserRole.user:
        return <Navigate to="/user" />;
      case EnumUserRole.administrator:
        return <Navigate to="/administrator" />;
      default:
        console.error("Unexpected user role");
        break;
    }
  }

  return (
    <>
      {/* Додати стиль на цю кнопку */}
      {currentStage !== EnumRegisterationStage.Main && (
        <button onClick={handleBack}>Go Back</button>
      )}

      {currentStage === EnumRegisterationStage.Main && (
        <RegisterForm onNext={handleStageProgression} />
      )}
      {currentStage === EnumRegisterationStage.EmailConfirmation && (
        <EmailConfirmationForm onNext={handleStageProgression} />
      )}
      {currentStage === EnumRegisterationStage.Preferences && (
        <PreferencesForm></PreferencesForm>
      )}
    </>
  );
};

export default RegisterPage;
