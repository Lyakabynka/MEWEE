import { CircularProgress } from "@mui/material";
import { useAuthStore, useErrors } from "../../../../entities";
import { useFormik } from "formik";
import "./index.css";
import { useTranslation } from "react-i18next";

export const EmailConfirmationForm: React.FC<{ onNext: () => void }> = ({
  onNext,
}) => {
  const { t } = useTranslation();
  const [errors, setErrors, setAutoClearErrors] = useErrors();
  const { confirmEmail, email, isLoading } = useAuthStore();

  const formik = useFormik({
    initialValues: { code: "" },

    onSubmit: () => {
      confirmEmail(onResponse, { email: email, code: formik.values.code });
    },
  });

  const onResponse = (errors: string[]) => {
    setAutoClearErrors(errors);

    if (errors.length == 0) onNext();
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          id="code"
          name="code"
          value={formik.values.code}
          onChange={formik.handleChange}
          placeholder="Code"
        ></input>
        <button type="submit">Verify email</button>
      </form>

      {errors &&
        errors.length > 0 &&
        errors.map((error, index) => (
          <span key={index} className="error">
            {t(error)}
          </span>
        ))}
      {isLoading && <CircularProgress></CircularProgress>}
    </div>
  );
};
