import {
  assignWorkCardTemp,
  clientCardTemp,
  eachGuardReportCardTemp,
  guardCardTemp,
  guardReportTemp,
  noDataFoundTemp,
  reportCardTemp,
  siteCardTemp,
} from "./components.js";
import { HTML } from "./selectors.js";

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
};
