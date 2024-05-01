import * as C from './config';
import * as Yup from 'yup';

export const EMAIL_VALIDATION = Yup.string()
  .min(C.EMAIL.MIN_LENGTH.value, C.EMAIL.MIN_LENGTH.message)
  .max(C.EMAIL.MAX_LENGTH.value, C.EMAIL.MAX_LENGTH.message)
  .matches(C.EMAIL.REGEX, C.EMAIL.INCORRECT_FORMAT_MESSAGE)
  .required(C.EMAIL.REQUIRED_MESSAGE);

export const USERNAME_VALIDATION = Yup.string()
  .min(C.NAME.MIN_LENGTH.value, C.NAME.MIN_LENGTH.message)
  .max(C.NAME.MAX_LENGTH.value, C.NAME.MAX_LENGTH.message)
  .required(C.NAME.REQUIRED_MESSAGE);

export const SURNAME_VALIDATION = Yup.string()
  .min(C.SURNAME.MIN_LENGTH.value, C.SURNAME.MIN_LENGTH.message)
  .max(C.SURNAME.MAX_LENGTH.value, C.SURNAME.MAX_LENGTH.message)
  .required(C.SURNAME.REQUIRED_MESSAGE);

export const PASSWORD_VALIDATION = Yup.string()
  .min(C.PASSWORD.MIN_LENGTH.value, C.PASSWORD.MIN_LENGTH.message)
  .max(C.PASSWORD.MAX_LENGTH.value, C.PASSWORD.MAX_LENGTH.message)
  .required(C.PASSWORD.REQUIRED_MESSAGE);

  export const CONFIRM_PASSWORD_VALIDATION = Yup.string()
  .required(C.PASSWORD.REQUIRED_MESSAGE);

export const POLICY_AGREE_VALIDATION = Yup.boolean()
  .oneOf([true], C.POLICY_AGREE.REQUIRED_MESSAGE)
  .required(C.POLICY_AGREE.REQUIRED_MESSAGE);

  