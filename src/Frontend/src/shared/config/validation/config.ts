export const NAME = {
    MIN_LENGTH: { value: 3, message: 'error_username_too_short' },
    MAX_LENGTH: { value: 50, message: 'error_username_too_long' },
    
    REQUIRED_MESSAGE: 'error_username_required',
  };
  
  export const SURNAME = {
    MIN_LENGTH: { value: 4, message: 'error_surname_too_short' },
    MAX_LENGTH: { value: 30, message: 'error_surname_too_long' },

    REQUIRED_MESSAGE: 'error_surname_required',
  };
  
  export const PASSWORD = {
    MIN_LENGTH: { value: 8, message: 'error_short_password' },
    MAX_LENGTH: { value: 30, message: 'error_password_too_long' },

    REQUIRED_MESSAGE: 'error_password_required',
    NO_MATCH_MESSAGE: 'error_nomatch_password',
  };

  export const EMAIL = {
    MIN_LENGTH: { value: 1, message: 'error_email_too_short' },
    MAX_LENGTH: { value: 60, message: 'error_email_too_long' },

    REGEX: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,

    REQUIRED_MESSAGE: 'error_email_required',
    INCORRECT_FORMAT_MESSAGE: 'error_invalid_email',
  };
  
  export const POLICY_AGREE = {
    REQUIRED_MESSAGE: 'error_agree_policy_required',
  };
  