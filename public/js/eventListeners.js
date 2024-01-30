import {
  addPostSiteFormTemp,
  clientPanelTemp,
  deleteBoxTemp,
  eachGuardReportCardTemp,
  guardLiProfileTemp,
  guardReportTemp,
  guardsOptions,
  loaderTemp,
  noDataFoundTemp,
  postSiteOptions,
  reportFormTemp,
  selectPostSiteTemp,
  selectedPostSitePanel,
} from "./components.js";
import { getData } from "./fetch.js";
import { printCard } from "./functions.js";
import { addPostSiteFormSubmit, reportFormSubmit } from "./onSubmit.js";
import {
  HTML,
  addC,
  addCN,
  addHTML,
  getCurrentDate,
  on,
  onN,
  qs,
  qsa,
  removeC,
  removeCa,
  removeOn,
  removeOnN,
} from "./selectors.js";
import { loaderItems } from "./vars.js";

const selectPostSiteEventListener = (e, data) => {
  if (e.target.value != "none") {
    let c1 = data.filter(
      (obj) => obj._id == qs("[data-select-client-name]").value
    );

    let p1 = c1[0].postSites.filter(
      (obj) => obj._id == qs("[data-select-post-site]").value
    );

    HTML("[data-select-guard]", guardsOptions(p1[0].guards));
  }
};
const postSiteGuardLiEventListener = async (e) => {
  removeCa("[data-post-site-guard]", "active");
  addCN(e.target, "active");

  HTML("[data-guard-li-profile]", loaderTemp("p-4"));

  let postSiteGuardProfile = JSON.parse(e.target.dataset.guardProfile);

  setTimeout(() => {
    HTML("[data-guard-li-profile]", guardLiProfileTemp(postSiteGuardProfile));
  }, 200);
};
const selectClientNameEventListener = (e, data, sl) => {
  HTML(
    "[data-select-post-site]",
    postSiteOptions(
      data.filter((itm) => itm._id == e.target.value)[0].postSites
    )
  );

  HTML("[data-select-guard]", "");

  if (sl == ".assign-work-li") {
    on("[data-select-post-site]", "change", (e) => {
      selectPostSiteEventListener(e, data);
    });
  }
};
const postSiteSelectEventListener = async (e) => {
  removeCa("[data-post-site]", "active");
  addCN(e.target, "active");

  HTML("[data-selected-post-site-info]", loaderTemp("p-4"));

  let postSiteProfile = JSON.parse(e.target.dataset.postSiteProfile);

  HTML(
    "[data-selected-post-site-info]",
    selectedPostSitePanel(postSiteProfile)
  );
  qsa("[data-post-site-guard]").forEach((itm, i, pn) => {
    onN(itm, "click", (e) => {
      postSiteGuardLiEventListener(e);
    });
  });
};
const addPostSiteEventListener = (e) => {
  HTML(".input-forms", loaderTemp());

  setTimeout(() => {
    HTML(".input-forms", addPostSiteFormTemp(e.target.dataset.btnId));
    on("[data-post-site-add-form]", "submit", function (e) {
      e.preventDefault();
      addPostSiteFormSubmit(e.target, this);
    });
  }, 200);

  removeC(".right-bar", "w-[0px] px-0 py-0");
};
const clientCardEventListen = async (e) => {
  HTML(".input-forms", "");
  addC(".right-bar", "w-[0px] px-0 py-0");

  HTML(".data-content", loaderTemp());
  let data = await getData("get-a-client", e.target.dataset.clientCard);

  HTML(".data-content", clientPanelTemp(data));

  on("[data-btn-id]", "click", (e) => addPostSiteEventListener(e));

  if (qsa("[data-post-site]").length > 0) {
    qsa("[data-post-site]").forEach((itm) =>
      onN(itm, "click", (e) => postSiteSelectEventListener(e))
    );
  }
  HTML("[data-selected-post-site-info]", selectPostSiteTemp());
};
const perHourInputEventListener = (e) => {
  HTML(".salary-amount", e.target.dataset.totalHour * e.target.value);
};
async function deleteDataDB(url) {
  try {
    await fetch(url, {
      method: "DELETE",
    });

    window.location.reload();
  } catch (error) {
    alert(error);
  }
}
const deleteBtnEventListen = (e, sl) => {
  e.stopPropagation();

  if (qs(".del-confirm-box")) {
    qs(".del-confirm-box .db-del-btn").dataset.delId = e.target.dataset.delId;
    removeC(".del-confirm-box", "hidden");
  } else {
    addHTML(
      ".alerts",
      deleteBoxTemp(e.target.dataset.delId, e.target.dataset.delGName)
    );
    on(".db-del-btn", "click", async (ev) => {
      if (sl == ".site-li") {
        await deleteDataDB(
          `/admin/data/site/delete/${ev.target.dataset.delId}`
        );
      }
      if (sl == ".guard-li") {
        await deleteDataDB(
          `/admin/data/guard/delete/${ev.target.dataset.delId}/${ev.target.dataset.delGName}`
        );
      }
      if (sl == ".client-li") {
        await deleteDataDB(
          `/admin/data/client/delete/${ev.target.dataset.delId}`
        );
      }
    });

    on(".del-cancel-btn", "click", () => addC(".del-confirm-box", "hidden"));
  }
};
const eachGuardEventListener = (e) => {
  let guardInfoObj = JSON.parse(e.target.dataset.eachGuardReportCard);

  HTML(".input-forms", loaderTemp());
  setTimeout(() => {
    (async () => {
      HTML(".input-forms", reportFormTemp(guardInfoObj));
      on(".report-add-form", "submit", (e) => {
        e.preventDefault();
        reportFormSubmit(e.target);
      });
    })();
  }, 200);
};
const reportCardEventListen = (e) => {
  let guardName = e.target.dataset.gName;
  HTML(".data-content", "");
  HTML(".input-forms", "");
  HTML(".data-content", loaderTemp());

  setTimeout(() => {
    addC(".data-content", "h-px");

    (async () => {
      HTML(
        ".data-content",
        guardReportTemp(
          await getData("each-guard", guardName, e.target.dataset.gMonth)
        )
      );
      qsa(".each-guard-report-card").forEach((itm) =>
        onN(itm, "click", (e) => eachGuardEventListener(e))
      );

      async function inputMonthEventListener(e) {
        HTML(".report-data", loaderTemp());
        HTML(".input-forms", "");

        let obj = await getData("each-guard", guardName, e.target.value);

        obj.data.length == 0 && HTML(".report-data", noDataFoundTemp());
        obj.data.length > 0 &&
          HTML(".report-data", eachGuardReportCardTemp(obj.data));

        qsa(".each-guard-report-card").forEach((itm) =>
          onN(itm, "click", (e) => eachGuardEventListener(e))
        );
      }

      on(".input-month", "change", inputMonthEventListener);
    })();
  }, 200);
};

export const activeItems = async (itm, activateItems) => {
  let assignInputPanelWidth = "w-[700px]";
  removeC(".data-content", "h-px");
  removeC(".right-bar", `${assignInputPanelWidth} w-[0px] px-0 py-0`);

  itm.temp && loaderItems.forEach((itm) => HTML(itm, loaderTemp()));
  !itm.temp && HTML(".data-content", loaderTemp());
  !itm.temp && HTML(".input-forms", "");

  removeCa(".controls li", "active");
  addC(itm.sl, "active");

  let data = await getData(itm.sl);
  printCard(".data-content", data, itm.sl);

  //for delete buttons
  if (!qsa(".del-btn").length <= 0) {
    qsa(".del-btn").forEach((itm) =>
      removeOnN(itm, "click", (e) => deleteBtnEventListen(e))
    );

    let itmSl = itm.sl;
    qsa(".del-btn").forEach((itm) =>
      onN(itm, "click", (e) => deleteBtnEventListen(e, itmSl))
    );
  }

  if (!qsa("[data-client-card]").length <= 0) {
    qsa("[data-client-card]").forEach((itm) =>
      onN(itm, "click", (e) => clientCardEventListen(e))
    );
  }

  if (itm.sl == ".assign-work-li") {
    addC(".right-bar", assignInputPanelWidth);
  }

  activateItems.forEach(
    (el) => qs(el.formSl) && removeOn(el.formSl, "submit", listen)
  );

  let clientPosts;
  clientPosts = await getData("load-clients-with-their-post-sites");

  itm.temp &&
    HTML(
      ".input-forms",
      itm.temp(
        itm.sl == ".guard-li" || itm.sl == ".assign-work-li"
          ? clientPosts
          : data,
        itm.sl == ".assign-work-li" ? getCurrentDate(new Date()) : null
      )
    );
  itm.sl == ".guard-li" &&
    on("[data-select-client-name]", "change", (e) =>
      selectClientNameEventListener(e, clientPosts)
    );
  if (itm.sl == ".assign-work-li") {
    on("[data-select-client-name]", "change", (e) => {
      selectClientNameEventListener(e, clientPosts, itm.sl);
    });
    on("[data-select-post-site]", "change", (e) => {
      selectPostSiteEventListener(e, clientPosts);
    });
  }

  itm.formSl && on(itm.formSl, "submit", listen);

  function listen(e) {
    e.preventDefault();
    itm.onSubmit(e.target, this);
  }

  if (itm.sl == ".schedule-li") {
    addC(".right-bar", `w-[0px] px-0 py-0`);
  }

  if (itm.sl == ".track-guards-li") {
    addC(".right-bar", `w-[0px] px-0 py-0`);
  }
};
//client
export const clientGuardEventListener = async (e, clientName) => {
  HTML(".data-content", loaderTemp());
  let eachGuard = await getData(
    "client-each-guard",
    e.target.dataset.guardName,
    e.target.dataset.gMonth,
    clientName
  );
  HTML(".data-content", guardReportTemp(eachGuard, "from-client"));
  on(".per-hour-input", "change", (e) => perHourInputEventListener(e));
  on(".per-hour-input", "keyup", (e) => perHourInputEventListener(e));

  async function inputMonthEventListener(ev) {
    HTML(".report-data", loaderTemp());

    let obj = await getData(
      "client-each-guard",
      e.target.dataset.guardName,
      ev.target.value,
      clientName
    );

    obj.data.length == 0 && HTML(".report-data", noDataFoundTemp());
    if (obj.data.length > 0) {
      HTML(".report-data", eachGuardReportCardTemp(obj.data, "from-client"));

      let totalHourNumber = obj.data.reduce((acc, dataObj) => {
        if (!isNaN(dataObj.totalWorked)) {
          acc += Number(dataObj.totalWorked);
          return acc;
        } else {
          return acc;
        }
      }, 0);

      HTML(".total-hour-span", totalHourNumber);
      qs("[data-total-hour]").dataset.totalHour = totalHourNumber;
      HTML(".salary-amount", `${totalHourNumber * 10}`);
    }
  }

  on(".input-month", "change", inputMonthEventListener);
};
