import {
  assignWorkCardTemp,
  clientCardTemp,
  eachGuardReportCardTemp,
  guardCardTemp,
  guardReportTemp,
  noDataFoundTemp,
  reportCardTemp,
  schedulePanelTemp,
  selectDateTemp,
  siteCardTemp,
} from "./components.js";
import { HTML, qs } from "./selectors.js";

export const printCard = (sl, data, type) => {
  HTML(sl, "");

  let mapedString;

  if (type == ".site-li") {
    mapedString = data.map((obj) => siteCardTemp(obj)).join(" ");
  }
  if (type == ".guard-li") {
    mapedString = data.map((obj) => guardCardTemp(obj)).join(" ");
  }
  if (type == ".client-li") {
    mapedString = data.map((obj) => clientCardTemp(obj)).join(" ");
  }
  if (type == ".assign-work-li") {
    mapedString = eachGuardReportCardTemp(data, "assign-work");
  }
  if (type == ".report-li") {
    mapedString = data.map((obj) => reportCardTemp(obj)).join(" ");
  }

  if (data.length == 0) {
    mapedString = noDataFoundTemp();
  }

  HTML(sl, mapedString);

  if (type == ".schedule-li") {
    schedulePanelTemp(qs(sl));
  }
};
export const generateDates = (dayNames, currentDate, repeat) => {
  const daysInWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const formattedDates = [];

  const startDate = new Date(currentDate);

  const dayIndices = dayNames.map((name) =>
    daysInWeek.findIndex((day) => name.toLowerCase() === day.toLowerCase())
  );

  const isValidDay = dayIndices.every((index) => index !== -1);

  if (!isValidDay) {
    throw new Error("Invalid day name provided");
  }

  let counter = 0;
  let increment = 0;

  if (repeat.endsWith("w")) {
    increment = 7 * parseInt(repeat);
  } else if (repeat.endsWith("m")) {
    increment = 30 * parseInt(repeat); // considering a month as 30 days for simplicity
  } else {
    throw new Error(
      "Invalid repeat format. Please use '2w' for weeks or '2m' for months."
    );
  }

  while (counter < increment) {
    const nextDate = new Date(startDate);
    nextDate.setDate(startDate.getDate() + counter);

    const dayIndex = nextDate.getDay();

    if (dayIndices.includes(dayIndex)) {
      formattedDates.push(nextDate.toISOString().slice(0, 10));
    }

    counter++;
  }

  return formattedDates;
};
