import Model from '../entities/models/base/Model.ts'
import Validator from '../utils/validation/Validator.js';

abstract class Controller  {
    
    protected abstract model: Model;
    protected abstract endpoint: string;
    protected validator: Validator;
    
    
    abstract getModel() : Object;

    public setModel(_model: Object):void
    {
        this.model.set(_model);
    }
    public getValidator() : Validator
    {
        return this.validator;
    }
    public getEndpoint() : string
    {
        return this.endpoint;
    }
}



export default Controller;
