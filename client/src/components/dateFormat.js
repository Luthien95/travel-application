export const dateFormat = (startDate, endDate) => {
  let startDateObject = formatDate({ date: startDate });
  let endDateObject = formatDate({ date: endDate });
  let stringDate = formatDateString({
    startDate: startDateObject,
    endDate: endDateObject,
  });

  return stringDate;
};

const formatDate = ({ date }) => {
  let dateArray = date.split("-");
  let year = dateArray[0];
  let month = dateArray[1];
  let day = dateArray[2];
  let monthName = null;

  switch (month) {
    case "01":
      monthName = "January";
      break;
    case "02":
      monthName = "February";
      break;
    case "03":
      monthName = "March";
      break;
    case "04":
      monthName = "April";
      break;
    case "05":
      monthName = "May";
      break;
    case "06":
      monthName = "June";
      break;
    case "07":
      monthName = "July";
      break;
    case "08":
      monthName = "August";
      break;
    case "09":
      monthName = "September";
      break;
    case "10":
      monthName = "October";
      break;
    case "11":
      monthName = "November";
      break;
    case "12":
      monthName = "December";
      break;
    default:
      console.log(`Sorry, the month doesn't exist.`);
  }

  let dateObject = {
    day: day,
    month: monthName,
    year: year,
  };

  return dateObject;
};

const formatDateString = ({ startDate, endDate }) => {
  let stringDate = null;

  if (
    startDate.day === endDate.day &&
    startDate.month === endDate.month &&
    startDate.year === endDate.year
  ) {
    stringDate = startDate.day + " " + startDate.month + " " + startDate.year;
  } else if (
    startDate.month === endDate.month &&
    startDate.year === endDate.year
  ) {
    stringDate =
      startDate.day +
      " - " +
      endDate.day +
      " " +
      startDate.month +
      " " +
      startDate.year;
  } else if (startDate.year === endDate.year) {
    stringDate =
      startDate.day +
      " " +
      startDate.month +
      " - " +
      endDate.day +
      " " +
      endDate.month +
      " " +
      startDate.year;
  } else {
    stringDate =
      startDate.day +
      " " +
      startDate.month +
      " " +
      startDate.year +
      " - " +
      endDate.day +
      " " +
      endDate.month +
      " " +
      endDate.year;
  }

  return stringDate;
};
