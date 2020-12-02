import { getTodayDate } from "./mixedFunctions";

export const addDefaultValues = () => {
  let defaultValues = {
    isPublic: false,
    startDate: getTodayDate(),
    endDate: getTodayDate(),
  };

  return defaultValues;
};
