import Model from '../base/Model.ts'

class LoginnModel extends Model
{
    model: object =
    {
        email: '',
        password: '',
    };
    protected jsonIgnore = [];
}
  
export default LoginnModel;
  