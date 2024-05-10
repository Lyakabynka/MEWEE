import React, { useState } from "react";
import { IRecoveryPageProps } from "../IRecoveryPageProps";
import { RecoveryEmailForm } from "../../../features/auth/RecoveryForm/RecoveryEmailForm";
import { EnumRecoveryStage } from "../../../entities/enums/EnumRecoveryStage";
import { RecoveryEmailConfirmationForm } from "../../../features/auth/RecoveryForm/email/stages/confirmationForm/index";
import { RecoverySetPasswordForm } from "../../../features/auth/RecoveryForm/generic/setPasswordForm";
import { RecoverySuccessFulForm } from "../../../features/auth/RecoveryForm/generic/recoverySucessfull";
import { useNavigate } from "react-router-dom";

export const RecoveryPage: React.FC<IRecoveryPageProps> = ({ url }) => {
  const navigate = useNavigate();
  const [currentStage, setCurrentStage] = useState<EnumRecoveryStage>(
    EnumRecoveryStage.Begin
  );

  const handleStageProgression = () =>
    setCurrentStage((prevStage) => prevStage + 1);
  const handleBack = () =>
    currentStage === EnumRecoveryStage.Begin
      ? navigate("/auth/login")
      : setCurrentStage(EnumRecoveryStage.Begin);
  const handleComplete = () => {
    setCurrentStage(EnumRecoveryStage.Begin);
    navigate("/auth/login");
  };
  return (
    <>
      {/* Додати стиль на цю кнопку */}
      {/* {currentStage !== EnumRecoveryStage.Sucess && (
        <button onClick={handleBack}>Go Back</button>
      )} */}
      {url == "email" && (
        <>
          {currentStage === EnumRecoveryStage.Begin && (
            <RecoveryEmailForm onNext={handleStageProgression} onBack={handleBack} />
          )}
          {currentStage === EnumRecoveryStage.Confirmation && (
            <RecoveryEmailConfirmationForm onNext={handleStageProgression} onBack={handleBack} />
          )}
          {currentStage === EnumRecoveryStage.ChangePassword && (
            <RecoverySetPasswordForm onNext={handleStageProgression} />
          )}
          {currentStage === EnumRecoveryStage.Sucess && (
            <RecoverySuccessFulForm
              onNext={handleComplete}
            ></RecoverySuccessFulForm>
          )}
        </>
      )}
      {url == "phone" && <></>}
    </>
  );
};
