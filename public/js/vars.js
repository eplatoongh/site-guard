import {
  assignWorkFormTemp,
  clientFormTemp,
  guardFormTemp,
  reportFormTemp,
  siteFormTemp,
} from "./components.js";
import {
  assignWorkFormSubmit,
  clientFormSubmit,
  guardFormSubmit,
  reportFormSubmit,
  siteFormSubmit,
} from "./onSubmit.js";

export const clientLoaderItems = [".data-guards", ".data-content"];
export const loaderItems = [".data-content", ".input-forms"];
export const activateItems = [
  {
    sl: ".site-li",
    temp: siteFormTemp,
    onSubmit: siteFormSubmit,
    formSl: ".sites-add-form",
  },
  {
    sl: ".guard-li",
    temp: guardFormTemp,
    onSubmit: guardFormSubmit,
    formSl: ".guard-add-form",
  },
  {
    sl: ".client-li",
    temp: clientFormTemp,
    onSubmit: clientFormSubmit,
    formSl: ".client-add-form",
  },
  {
    sl: ".assign-work-li",
    temp: assignWorkFormTemp,
    onSubmit: assignWorkFormSubmit,
    formSl: ".assign-work-add-form",
  },
];
