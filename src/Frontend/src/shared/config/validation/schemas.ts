import * as Yup from 'yup';
import * as C from './config';
import * as V from './validations';

export const REGISTER_SCHEMA = Yup.object().shape({
  username: V.USERNAME_VALIDATION,
  surname: V.SURNAME_VALIDATION,
  email: V.EMAIL_VALIDATION,
  password: V.PASSWORD_VALIDATION,
  confirm_password: V.PASSWORD_VALIDATION.oneOf([Yup.ref('password')], C.PASSWORD.NO_MATCH_MESSAGE),
  policyAgree: V.POLICY_AGREE_VALIDATION, 
});

export const LOGIN_SCHEMA = Yup.object().shape({
  email: V.EMAIL_VALIDATION,
  password: V.PASSWORD_VALIDATION
});

export const SET_NEW_PASSWORD_SCHEMA = Yup.object().shape({
  password: V.PASSWORD_VALIDATION,
  confirm_password: V.PASSWORD_VALIDATION.oneOf([Yup.ref('password')], C.PASSWORD.NO_MATCH_MESSAGE),
});