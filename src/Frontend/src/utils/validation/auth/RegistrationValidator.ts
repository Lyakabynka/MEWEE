import Validator from "../Validator.ts";

class RegistrationValidator extends Validator {
    
   requiredFields: string[] = ['username', 'surname', 'email', 'password'];
   minLengthFields: { [key: string]: number } = { password: 6 };


    public validate(data: { [key: string]: string }): { [key: string]: string } {
        const errors: { [key: string]: string } = this.validateRequired(data, this.requiredFields);

        this.validateEmail(data, errors);
        this.validateMinLength(data, errors);

        this.validatePasswordConfirmation(data, errors);
        this.validatePolicyAgreement(data, errors);

        return errors;
    }

    private validateEmail(data: { [key: string]: string }, errors: { [key: string]: string }): void {
        if (data.email && !this.isValidEmail(data.email)) {
            errors.email = 'error_invalid_email';
        }
    }

    private validateMinLength(data: { [key: string]: string }, errors: { [key: string]: string }): void {
        Object.entries(this.minLengthFields).forEach(([field, minLength]) => {
            if (data[field]?.length < minLength) {
                errors[field] = `error_short_${field}`;
            }
        });
    }

    private validatePasswordConfirmation(data: { [key: string]: string }, errors: { [key: string]: string }): void {
        if (data.password !== data.confirm_password) {
            errors.confirm_password = 'error_nomatch_password';
        }
    }

    private validatePolicyAgreement(data: { [key: string]: string }, errors: { [key: string]: string }): void {
        if (!data.policyAgree) {
            errors.agreeToPolicy = 'error_agree_policy_required';
        }
    }
}

export default RegistrationValidator;
