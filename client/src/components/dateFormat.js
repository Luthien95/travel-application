export const dateFormat = (startDate, endDate) => {
  let stringDate = null;

  let startDateArray = startDate.split("-");
  let startYear = startDateArray[0];
  let startMonth = startDateArray[1];
  let startDay = startDateArray[2];
  let startMonthName = null;

  switch (startMonth) {
    case "01":
      startMonthName = "January";
      break;
    case "02":
      startMonthName = "February";
      break;
    case "03":
      startMonthName = "March";
      break;
    case "04":
      startMonthName = "April";
      break;
    case "05":
      startMonthName = "May";
      break;
    case "06":
      startMonthName = "June";
      break;
    case "07":
      startMonthName = "July";
      break;
    case "08":
      startMonthName = "August";
      break;
    case "09":
      startMonthName = "September";
      break;
    case "10":
      startMonthName = "October";
      break;
    case "11":
      startMonthName = "November";
      break;
    case "12":
      startMonthName = "December";
      break;
    default:
      console.log(`Sorry, the month doesn't exist.`);
  }

  let endDateArray = endDate.split("-");
  let endYear = endDateArray[0];
  let endMonth = endDateArray[1];
  let endDay = endDateArray[2];
  let endMonthName = null;

  switch (endMonth) {
    case "01":
      endMonthName = "January";
      break;
    case "02":
      endMonthName = "February";
      break;
    case "03":
      endMonthName = "March";
      break;
    case "04":
      endMonthName = "April";
      break;
    case "05":
      endMonthName = "May";
      break;
    case "06":
      endMonthName = "June";
      break;
    case "07":
      endMonthName = "July";
      break;
    case "08":
      endMonthName = "August";
      break;
    case "09":
      endMonthName = "September";
      break;
    case "10":
      endMonthName = "October";
      break;
    case "11":
      endMonthName = "November";
      break;
    case "12":
      endMonthName = "December";
      break;
    default:
      console.log(`Sorry, the month doesn't exist.`);
  }

  if (startDay === endDay && startMonth === endMonth && startYear === endYear) {
    stringDate = startDay + " " + startMonthName + " " + startYear;
  } else if (startMonth === endMonth && startYear === endYear) {
    stringDate =
      startDay + " - " + endDay + " " + startMonthName + " " + startYear;
  } else if (startYear === endYear) {
    stringDate =
      startDay +
      " " +
      startMonthName +
      " - " +
      endDay +
      " " +
      endMonthName +
      " " +
      startYear;
  } else {
    stringDate =
      startDay +
      " " +
      startMonthName +
      " " +
      startYear +
      " - " +
      endDay +
      " " +
      endMonthName +
      " " +
      endYear;
  }

  return stringDate;
};
