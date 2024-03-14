import { useState } from 'react';
import sendRequest from '../services/HttpService.ts';

const useForm = (controller) => {
  const [formData, setFormData] = useState(controller.getModel());
  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState(null); // Initialize response as null

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear errors on submit
    const validationErrors = controller.getValidator().validate(formData);

    if (Object.keys(validationErrors).length === 0) {
      try {
        controller.setModel(formData);
        const response = await sendRequest(controller);
        setResponse(response);

        if(response['errors'])
          setErrors(response['errors']);
        
        console.log("[useForm] HttpService response:", response);
      } catch (error) {
        console.error('[useForm] Error submitting request:', error);
      }
    } else {
      setErrors(validationErrors); // Set validation errors if any
    }
  };

  return { formData, errors, response, handleChange, handleSubmit };
};

export default useForm;
