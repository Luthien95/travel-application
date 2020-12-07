import { getTodayDate } from "./mixedFunctions";
import Cookie from "js-cookie";
var jwt = require("jsonwebtoken");

export const addDefaultValues = () => {
  const token = Cookie.get("token");
  const decode = jwt.decode(token);
  const userId = decode._id;

  let defaultValues = {
    isPublic: false,
    startDate: getTodayDate(),
    endDate: getTodayDate(),
    userId: userId,
  };

  console.log(defaultValues);

  return defaultValues;
};
