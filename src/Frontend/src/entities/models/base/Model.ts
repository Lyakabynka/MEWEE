abstract class Model {
    protected abstract model: object;
    protected abstract jsonIgnore: string[];
  
    protected makePropertiesNonEnumerable(obj: object, properties: string[]): void {
      properties.forEach(prop => {
        Object.defineProperty(obj, prop, {
          enumerable: false
        });
      });
    }
    get(): object {
      this.makePropertiesNonEnumerable(this.model, this.jsonIgnore);
      return this.model;
    }
    public set(_model: Object): void {
      this.model = _model;
    }
  }

export default Model;
  