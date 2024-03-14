import Validator from "../Validator.ts";

class LoginValidator extends Validator {
    
   requiredFields: string[] = ['email', 'password'];


    public validate(data: { [key: string]: string }): { [key: string]: string } {
        const errors: { [key: string]: string } = this.validateRequired(data, this.requiredFields);

        this.validateEmail(data, errors);

        return errors;
    }

    private validateEmail(data: { [key: string]: string }, errors: { [key: string]: string }): void {
        if (data.email && !this.isValidEmail(data.email)) {
            errors.email = 'error_invalid_email';
        }
    }
}

export default LoginValidator;
