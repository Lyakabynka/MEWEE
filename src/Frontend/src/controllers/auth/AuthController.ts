import { AuthType } from "../../entities/enums/AuthType.ts";
import RegistrationModel from "../../entities/models/auth/RegistrationModel.ts";
import Controller from "../Controller.ts";
import Model from '../../entities/models/base/Model.ts'
import ENDPOINTS from '../../constants/endpoints.js'
import RegistrationValidator from "../../utils/validation/auth/RegistrationValidator.ts";
import LoginnModel from "../../entities/models/auth/LoginModel.ts";
import LoginValidator from "../../utils/validation/auth/LoginValidator.ts";

class AuthController extends Controller {
    
    protected endpoint: string;
    protected model: Model;
    protected authType: AuthType;

    constructor(type: AuthType)
    {
        super();

        this.authType = type;
        this.setMyModel();
    }

    private setMyModel(): void {
        switch (this.authType) {
            case AuthType.Registration:
                this.model = new RegistrationModel();
                this.validator = new RegistrationValidator();
                this.endpoint = ENDPOINTS.USER.REGISTER;    
            break;
            case AuthType.Login:
                this.model = new LoginnModel();
                this.validator = new LoginValidator();
                this.endpoint = ENDPOINTS.AUTH.LOGIN;
                break;
            default:
                throw new Error('Invalid authentication type');
        }
    }

    getAuthType(): AuthType{
        return this.authType;
    }
    getModel(): Object {
        return this.model.get();
    }

}

export default AuthController;
