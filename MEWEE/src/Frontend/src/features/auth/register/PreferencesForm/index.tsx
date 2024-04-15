import {
    CircularProgress,
} from "@mui/material";
import { useAuthStore, useErrors } from "../../../../entities";
import { useFormik } from 'formik';
import './index.css'
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const PreferencesForm: React.FC<{ }> = ({  }) => {

    const {t} = useTranslation();
    const [errors, setErrors, setAutoClearErrors] = useErrors();
    const { confirmEmail, email, isLoading } = useAuthStore();
    const navigate = useNavigate();

    const formik = useFormik(
    {
        initialValues: { code: '', },

        onSubmit: () => { confirmEmail(onResponse, { email: email, code: formik.values.code}); }
    });


    const onResponse = (errors: string[]) =>
    {
        setAutoClearErrors(errors);

    }


    return (
        <div className="preferences-main-container">
            <span>Вибір вподобань</span>
            <div className="preferences-items-container-block">
                <div className="preferences-input-container">
                    <input type="text"></input>
                </div>
                <div className="preferences-items-content-block">
                    <div className="preferences-items-container">
                        <div className="preference-item">
                            <span>Label</span>    
                        </div>
                    </div>
                </div>
            </div>
            <span>Вибір професії / спеціалізації</span>
            <div className="preferences-items-container-block">
                <div className="preferences-input-container">
                </div>
                <div className="preferences-items-content-block">
                    <div className="preferences-items-container">
                    </div>
                </div>
            </div>

            <button onClick={() => navigate('/auth/login')}>Finish</button>
        </div>
    );
}