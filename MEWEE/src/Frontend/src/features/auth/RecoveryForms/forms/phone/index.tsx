import React, { useEffect } from "react";
import { useFormik } from "formik"; // Import Formik library
import * as Yup from "yup"; // Import Yup for validation
import { useAuthStore } from "../../../../../entities";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const RecoveryPhoneForm = () => {
  const { t } = useTranslation();
  const { register, isLoading } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="">
      <span>Phone</span>
    </div>
  );
};
