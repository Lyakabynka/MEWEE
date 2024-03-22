import React, { useEffect } from 'react';
import { useFormik } from 'formik'; // Import Formik library
import { useAuthStore } from '../../../entities';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { REGISTER_SCHEMA } from '../../../shared';

export const RegisterForm = () => {
  const {t} = useTranslation();
  const { register, resetErrorInfo, isLoading, errorMessage } = useAuthStore();
  const navigate = useNavigate();
  

  const formik = useFormik({
    initialValues: {
      username: '',
      surname: '',
      email: '',
      password: '',
      confirm_password: '',
      policyAgree:false,
    },
    validationSchema: REGISTER_SCHEMA,
    onSubmit: (values) => {

      values.username = values.username + ' ' + values.surname;
      const { surname, confirm_password, policyAgree, ...rest } = values;
      console.log(rest);
      
      register(rest).then(() => {
        if (!errorMessage) {
          navigate('/auth/login');
        }
      });
    },
  });

  useEffect(() => {
    resetErrorInfo();
  }, []);

  return (
    <div className="register-form-container">
        <div className="buttons-container">
            <div onClick={() => navigate("/auth/login")} className="button-c">
                <a >{t('login')}</a>
            </div>
            <div onClick={() => navigate("/auth/register")} className="button-c">
                <a>{t('registration')}</a>
            </div>
        </div>
      <div className='login-or-block'>
        <div></div>
        <span>{t('or')}</span>
        <div></div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="input-group">
          <input type="text" id="username" name="username" placeholder={t('name')+'*'} value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.touched.username && formik.errors.username && <div className="error">{t(formik.errors.username)}</div>}

          <input type="text" id="surname" name="surname"  placeholder={t('surname')} value={formik.values.surname} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.touched.surname && formik.errors.surname && <div className="error">{t(formik.errors.surname)}</div>}
        </div>
        <div className="input-group">
          <input type="email" id="email" name="email" placeholder={t('email')+'*'} value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.touched.email && formik.errors.email && <div className="error">{t(formik.errors.email)}</div>}
        </div>
        <div className="input-group">
          <input type="password" id="password" name="password" placeholder={t('password')+'*'} value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          <input type="password" id="confirm_password" name="confirm_password" placeholder={t('confirm_password')+'*'} value={formik.values.confirm_password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.touched.password && formik.errors.password && <div className="error">{t(formik.errors.password)}</div>}
          {formik.touched.confirm_password && formik.errors.confirm_password && <div className="error">{t(formik.errors.confirm_password)}</div>}
        </div>
        <div className="input-group">
          <button type="submit">{t('registration')}</button>
          <input type="checkbox" id="policyAgree" name="policyAgree" checked={formik.values.policyAgree} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          <span>{t('agree-with-policy')}</span>
          {formik.touched.policyAgree && formik.errors.policyAgree && <div className="error">{t(formik.errors.policyAgree)}</div>}
        </div>
      </form>

      {isLoading && <div className="loading-indicator">Loading...</div>}
    </div>
  );
};
{/* <div className="login-link">
<a href="/auth/login">Already have an account? Sign in</a>
</div> */}