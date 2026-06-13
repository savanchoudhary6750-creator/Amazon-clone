import { sendResponse } from "../utils/response.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

export const validateRequest = (validatorFn) => {
  return (req, res, next) => {
    const { isValid, errors } = validatorFn(req.body);
    if (!isValid) {
      return sendResponse(
        res,
        HTTP_STATUS.BAD_REQUEST,
        "Validation failed",
        null,
        errors
      );
    }
    next();
  };
};

export default validateRequest;
