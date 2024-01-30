import { calculateTotalHours, generateDates } from "./functions.js";
import { submitLoaderEnd, submitLoaderStart } from "./selectors.js";

async function addNameToDB(url, data) {
  try {
    let res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.status == 451) {
      alert(res.statusText);
    } else {
      winReload();
    }
  } catch (error) {
    alert(error);
  }
}
function winReload() {
  window.location.reload();
}
function getObjByName(This) {
  const formData = new FormData(This); // 'this' refers to the form element
  const formValues = {};

  for (const [name, value] of formData.entries()) {
    if (name == "repeatShift") {
      formValues[name] = Array.from(This.repeatShift.selectedOptions).map(
        (opt) => opt.value
      );
    } else {
      formValues[name] = value;
    }
  }
  return formValues;
}

export const siteFormSubmit = async (e, This) => {
  submitLoaderStart(e);
  let obj = getObjByName(This);
  await addNameToDB(`/admin/site/add`, obj);
  submitLoaderEnd(e);
};
export const clientFormSubmit = async (e, This) => {
  submitLoaderStart(e);
  let obj = getObjByName(This);
  await addNameToDB(`/admin/client/add`, obj);
  submitLoaderEnd(e);
};
export const guardFormSubmit = async (e, This) => {
  submitLoaderStart(e);
  let obj = getObjByName(This);
  await addNameToDB(`/admin/guard/add`, obj);
  submitLoaderEnd(e);
};
export const assignWorkFormSubmit = async (e, This) => {
  function getNameDatasetObj(str) {
    return Array.from(This[str].children).filter(
      (opt) => opt.value == This[str].value
    )[0].dataset;
  }
  let guardName = getNameDatasetObj("guardID").guardName;
  let contact = getNameDatasetObj("guardID").contact;
  let address = getNameDatasetObj("guardID").address;
  let postSite = getNameDatasetObj("postSiteID").postSite;
  let clientName = getNameDatasetObj("clientID").clientName;

  submitLoaderStart(e);
  let obj = getObjByName(This);
  let { repeatShift, repeatFor, ...scheduleObj } = obj;

  // Example usage:
  const weekDays = repeatShift; // Weekdays to retrieve
  const startDate = new Date().toISOString().slice(0, 10);
  const repeatFormat = repeatFor; // Change this to "2m" for 2 months

  const resultDates = generateDates(weekDays, startDate, repeatFormat);
  const Schedule = resultDates.map((itm) => ({
    ...scheduleObj,
    workDate: itm,
    guardName,
    postSite,
    clientName,
    contact,
    address,
    repeatShift,
    workDone: false,
    totalHour: Number(calculateTotalHours(obj.startTime, obj.endTime)),
  }));

  for (let i = 0; i < Schedule.length; i++) {
    const obj = Schedule[i];
    await fetch(`/admin/schedule/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    });
  }

  submitLoaderEnd(e);
  winReload();
};
export const reportFormSubmit = async (e, This) => {
  submitLoaderStart(e);
  let obj = getObjByName(This);
  await fetch(`/admin/guard/report/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  submitLoaderEnd(e);
  winReload();
};
export const addPostSiteFormSubmit = async (e, This) => {
  submitLoaderStart(e);
  let obj = getObjByName(This);
  await fetch(`/admin/update/client/add/post/site`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: This.dataset.postSiteAddForm, obj }),
  });
  submitLoaderEnd(e);
  winReload();
};
//client
export const clientLoginFormSubmit = async (e, fn) => {
  if (e.clientName.value != "") {
    submitLoaderStart(e);
    let res = await fetch("/admin/if/client/exists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clientName: e.clientName.value }),
    });

    if (res.status == 200) {
      let data = await res.json();
      submitLoaderEnd(e);
      return data;
    } else {
      alert(res.statusText);
      submitLoaderEnd(e);
      return { found: false };
    }
  } else {
    alert("Give a client name first!");
  }
};
