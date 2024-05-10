import React, { useEffect, useState } from "react";
import {
  EnumRegistrationStage,
  EnumUserRole,
  useAuthStore,
} from "../../../entities";
import { Navigate } from "react-router-dom";
import {
  EmailConfirmationForm,
  PreferencesForm,
  RegisterForm,
} from "../../../features/exportFeaturesComponents";
import { IAuthPageProps } from "../IAuthPageProps";

export const RegisterPage: React.FC<IAuthPageProps> = ({
  setActiveAuthNav,
}) => {
  const { role, isLoggedIn } = useAuthStore();
  const [currentStage, setCurrentStage] = useState<EnumRegistrationStage>(
    EnumRegistrationStage.Main
  );

  const handleStageProgression = () =>
    setCurrentStage((prevStage) => prevStage + 1);
  const handleBack = () => setCurrentStage(EnumRegistrationStage.Main);

  useEffect(() => {
    setActiveAuthNav(currentStage === EnumRegistrationStage.Main);
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
      {/*{currentStage !== EnumRegistrationStage.Main && (*/}
      {/*  <button onClick={handleBack}>Go Back</button>*/}
      {/*)}*/}

      {currentStage === EnumRegistrationStage.Main && (
        <RegisterForm onNext={handleStageProgression} />
      )}
      {currentStage === EnumRegistrationStage.EmailConfirmation && (
        <EmailConfirmationForm onNext={handleStageProgression} onBack={handleBack} />
      )}
      {currentStage === EnumRegistrationStage.Preferences && (
        <PreferencesForm></PreferencesForm>
      )}
    </>
  );
};

export default RegisterPage;
