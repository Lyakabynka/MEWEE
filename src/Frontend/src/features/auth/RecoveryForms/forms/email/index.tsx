import React, { useEffect, useState } from "react";
import { useFormik } from "formik"; // Import Formik library
import * as Yup from "yup"; // Import Yup for validation
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEmailStore } from "../../../../../entities";
import { EMAIL_VALIDATION } from "../../../../../shared/exportSharedMorules";

export const RecoveryEmailForm = () => {
  const { t } = useTranslation();
  const { checkEmail, resetErrorInfo, isLoading } = useEmailStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post('/api/send-confirmation-email', { email });
  //     console.log('Email sent successfully:', response.data);
  //     // Optionally, show a success message to the user
  //   } catch (error) {
  //     console.error('Error sending email:', error);
  //     // Optionally, show an error message to the user
  //   }
  // };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: EMAIL_VALIDATION,
    onSubmit: (values) => {
      checkEmail(values).then(() => {
        // if (!errorMessage) {
        //   //navigate('/recovery/email');
        // }
        // console.log(errorMessage)
      });
    },
  });

  useEffect(() => {
    resetErrorInfo();
  }, []);

  return (
    <div className="">
      <form onSubmit={formik.handleSubmit}>
        <div className="input-group">
          <input
            type="email"
            id="email"
            name="email"
            placeholder={t("email") + "*"}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error">{t(formik.errors.email)}</div>
          )}
        </div>
        <div className="input-group">
          <button type="submit">{t("send")} E-mail</button>
        </div>
      </form>
      {isLoading && <div className="loading-indicator">Loading...</div>}
    </div>
  );
};
