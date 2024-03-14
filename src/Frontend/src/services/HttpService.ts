import axios from 'axios';
import Controller from "../controllers/Controller.ts";

const sendRequest = async (controller: Controller) => {
  let result = { "errors":[] };
  try {
    console.log("[HttpService] Form Data:", controller.getModel());

    const response = await axios.post(controller.getEndpoint(), controller.getModel());
    result = response.data;
  } catch (error) {
    console.log("[HttpService] Error: ", error);

    const { errors } = error.response.data;
    result['errors'] = errors;
  }
  return result;
};

export default sendRequest;
