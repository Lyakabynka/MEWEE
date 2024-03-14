// validation.js
abstract class Validator {
    constructor() {
      if (this.constructor === Validator) {
        throw new Error("Cannot instantiate abstract class");
      }
    }
  
    public abstract validate(data: { [key: string]: string }): { [key: string]: string };
    public validateRequired(data: { [key: string]: string }, requiredFields: string[]): { [key: string]: string }
    {
      const errors: { [key: string]: string } = {};

      requiredFields.forEach(field => {
          if (!data[field]?.trim()) {
              errors[field] = `error_${field}_required`;
          }
      });

      return errors;
    }

    protected isValidEmail(email){
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
  }
  export default Validator;