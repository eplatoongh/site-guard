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

export const siteFormSubmit = async (e) => {
  submitLoaderStart(e);

  let obj = {
    siteName: e.siteName && e.siteName.value,
  };

  await addNameToDB(`/admin/site/add`, obj);

  submitLoaderEnd(e);
};
export const guardFormSubmit = async (e) => {
  submitLoaderStart(e);

  let obj = {
    guardName: e.guardName && e.guardName.value,
  };

  await addNameToDB(`/admin/guard/add`, obj);
  submitLoaderEnd(e);
};
export const clientFormSubmit = async (e) => {
  submitLoaderStart(e);

  let obj = {
    clientName: e.clientName && e.clientName.value,
  };

  await addNameToDB(`/admin/client/add`, obj);
  submitLoaderEnd(e);
};
export const assignWorkFormSubmit = async (e) => {
  submitLoaderStart(e);

  let obj = {
    siteName: e.siteName && e.siteName.value,
    guardName: e.guardName && e.guardName.value,
    clientName: e.clientName && e.clientName.value,
    shift: e.shift && e.shift.value,
    date: e.date && e.date.value,
    startTime: e.startTime && e.startTime.value,
    endTime: e.endTime && e.endTime.value,
  };

  await addNameToDB(`/admin/work/add`, obj);
  submitLoaderEnd(e);
};
export const reportFormSubmit = async (e) => {
  submitLoaderStart(e);

  let obj = {
    guardName: e.guardName && e.guardName.value,
    workId: e.workId && e.workId.value,
    date: e.date && e.date.value,
    shift: e.shift && e.shift.value,
    totalWorked: e.totalWorked && e.totalWorked.value,
  };

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
      submitLoaderEnd(e);
      return true;
    } else {
      alert(res.statusText);
      submitLoaderEnd(e);
      return false;
    }
  } else {
    alert("Give a client name first!");
  }
};
