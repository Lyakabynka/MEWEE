import Model from '../base/Model.ts'

class RegistrationModel extends Model
{

    model: object =
    {
        username: '',
        surname: '',
        email: '',
        password: '',
        confirm_password: '',
        policyAgree: false
    };
    protected jsonIgnore = ['surname', 'confirm_password', 'policyAgree'];
}
  
  export default RegistrationModel;
  