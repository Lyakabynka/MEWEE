import { CircularProgress } from "@mui/material";
import { useAuthStore, useErrors, useThemeStore } from "../../../../entities";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { CodeItem } from "../../RecoveryForm/components/codeitem";
import styles from "./email_confirmation.module.scss";

export const EmailConfirmationForm: React.FC<{
  onNext: () => void;
  onBack: () => void;
}> = ({ onNext, onBack }) => {
  const { t } = useTranslation();
  const [errors, setErrors, setAutoClearErrors] = useErrors();
  const { confirmEmail, email, isLoading } = useAuthStore();
  const [otp, setOtp] = useState(new Array(8).fill(""));

  const formik = useFormik({
    initialValues: { code: "" },

    onSubmit: () => {
      confirmEmail(onResponse, { email: email, code: otp.join("") });
    },
  });

  const onResponse = (errors: string[]) => {
    setAutoClearErrors(errors);

    if (errors.length == 0) onNext();
  };

  const codeError = formik.errors.code;
  return (
    <div className={styles.div}>
      <form onSubmit={formik.handleSubmit}>
        <header>{t("confirm_email")}</header>
        <main>
          <CodeItem otp={otp} setOtp={setOtp} />
          {formik.errors.code && (
            <div className={styles.error}>{t(formik.errors.code)}</div>
          )}
        </main>
        <footer>
          <button type="submit">{t("verify") + " " + t("code")}</button>
          <button onClick={onBack}>{t("go_back")}</button>
        </footer>
        {isLoading && <CircularProgress></CircularProgress>}
      </form>

      {errors &&
        errors.length > 0 &&
        errors.map((error, index) => (
          <span key={index} className={styles.error}>
            {t(error)}
          </span>
        ))}
    </div>
  );
};
