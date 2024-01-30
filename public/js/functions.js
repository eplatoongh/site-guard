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
  trackGuardsPanelTemp,
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
  if (type == ".track-guards-li") {
    trackGuardsPanelTemp(qs(sl));
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
export const getCurrentDayHighlighted = (daysArray) => {
  console.log(daysArray);

  const currentDate = new Date();
  const currentDay = currentDate
    .toLocaleString("en-US", { weekday: "long" })
    .toLowerCase();

  if (daysArray.includes(currentDay)) {
    const joinedDays = daysArray.join(" | ");
    const formattedDays = daysArray
      .map((day) => {
        if (day.toLowerCase() === currentDay) {
          return `<mark>${day}</mark>`;
        } else {
          return day;
        }
      })
      .join(" | ");
    return formattedDays;
  } else {
    const joinedDays = daysArray.join(" | ");
    return joinedDays;
  }
};
export const calculateTotalHours = (startTime, endTime) => {
  // Split the time strings into hours and minutes
  const startParts = startTime.split(":").map(Number);
  const endParts = endTime.split(":").map(Number);

  // Convert hours and minutes into total minutes
  const startMinutes = startParts[0] * 60 + startParts[1];
  const endMinutes = endParts[0] * 60 + endParts[1];

  // Calculate the time difference in minutes
  let timeDiff = endMinutes - startMinutes;

  // If the end time is smaller than the start time, add 24 hours (1440 minutes) to the difference
  if (timeDiff < 0) {
    timeDiff += 24 * 60;
  }

  // Convert the total minutes to hours and minutes
  const hours = Math.floor(timeDiff / 60);
  const minutes = timeDiff % 60;

  return hours + "." + (minutes < 10 ? "0" : "") + minutes;
};
export const dotAnimation = {
  intervalId: null,
  dots: "",
  delay: 500,
  maxDots: 3,
  targetElement: null,

  // Function to add a dot at the end of the string
  addDot() {
    console.log(this.targetElement);

    this.dots += ".";
    this.targetElement.textContent = this.dots; // Update the DOM with the dots
  },

  // Function to animate dots
  animate() {
    this.addDot();
    if (this.dots.length > this.maxDots) {
      this.dots = ""; // Reset dots after displaying maximum dots
    }
  },

  // Start the animation
  start(targetSelector, customDelay = 500, customMaxDots = 3) {
    this.targetElement = targetSelector;
    if (!this.targetElement) {
      console.error("Invalid target element");
      return;
    }

    this.delay = customDelay;
    this.maxDots = customMaxDots;

    this.intervalId = setInterval(() => {
      this.animate();
    }, this.delay);
  },

  // Stop the animation
  stop() {
    clearInterval(this.intervalId);
    this.dots = ""; // Reset dots when stopping the animation
    if (this.targetElement) {
      this.targetElement.textContent = ""; // Clear the content on the target element
    }
  },
};
export const calculateTotalHoursAsync = (dataArray) => {
  return new Promise((resolve, reject) => {
    try {
      let totalHours = 0;

      dataArray.forEach((item, i) => {
        totalHours += item.totalHour;

        if (i + 1 == dataArray.length) {
          resolve(totalHours);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};
