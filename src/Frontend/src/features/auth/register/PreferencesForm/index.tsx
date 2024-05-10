import { CircularProgress } from "@mui/material";
import { useAuthStore, useErrors } from "../../../../entities";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./preferences_form.module.scss";
import { useState } from "react";

export const PreferencesForm: React.FC<{}> = ({}) => {
  const { t } = useTranslation();
  const [errors, setErrors, setAutoClearErrors] = useErrors();
  const { confirmEmail, email, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const [spanValue, setSpanValue] = useState("");
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  const handleSpanClick = (label: string) => {
    const updatedLabels = [...selectedLabels];

    if (updatedLabels.includes(label)) {
      const index = updatedLabels.indexOf(label);
      updatedLabels.splice(index, 1);
    } else {
      updatedLabels.push(label);
    }

    setSelectedLabels(updatedLabels);

    setSpanValue(updatedLabels.join(" | "));
  };

  const formik = useFormik({
    initialValues: { code: "" },

    onSubmit: () => {
      confirmEmail(onResponse, { email: email, code: formik.values.code });
    },
  });

  const onResponse = (errors: string[]) => {
    setAutoClearErrors(errors);
  };

  const labels = [
    "Music",
    "Sport",
    "Game",
    "Cooking",
    "Art",
    "Technology",
    "Health & Fitness",
    "Fashion",
    "Travel",
  ];

  return (
    <div className={styles.div}>
      <header>
        <span>{t("choice_preferences")}</span>
        <div className={styles.div_header}>
          <div>
            <span>{spanValue}</span>
          </div>
          <div>
            <div>
              {labels.map((label, index) => (
                <span
                  key={index}
                  onClick={() => handleSpanClick(label)}
                  className={`${
                    selectedLabels.includes(label) ? styles.selected : ""
                  }`}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>
      <main>
        <span>{t("choice_profession")}</span>
        <div className={styles.div_main}>
          <textarea placeholder={t("preferences_placeholder")}></textarea>
        </div>
      </main>
      <footer>
        <button onClick={() => navigate("/auth/login")}>
          {t("button_finish")}
        </button>
      </footer>
    </div>
  );
};
