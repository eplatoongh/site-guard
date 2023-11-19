import {
  deleteBoxTemp,
  eachGuardReportCardTemp,
  guardReportTemp,
  loaderTemp,
  noDataFoundTemp,
  reportFormTemp,
} from "./components.js";
import { getData } from "./fetch.js";
import { printCard } from "./functions.js";
import { reportFormSubmit } from "./onSubmit.js";
import {
  HTML,
  addC,
  addHTML,
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
  removeC(".data-content", "h-px");
  itm.temp && loaderItems.forEach((itm) => HTML(itm, loaderTemp()));
  !itm.temp && HTML(".data-content", loaderTemp());
  !itm.temp && HTML(".input-forms", "");
  removeCa(".controls li", "active");
  addC(itm.sl, "active");

  let data = await getData(itm.sl);
  printCard(".data-content", data, itm.sl);
  !qsa(".report-card").length <= 0 &&
    qsa(".report-card").forEach((itm) =>
      onN(itm, "click", (e) => reportCardEventListen(e))
    );

  if (!qsa(".del-btn").length <= 0) {
    qsa(".del-btn").forEach((itm) =>
      removeOnN(itm, "click", (e) => deleteBtnEventListen(e))
    );

    let itmSl = itm.sl;
    qsa(".del-btn").forEach((itm) =>
      onN(itm, "click", (e) => deleteBtnEventListen(e, itmSl))
    );
  }

  activateItems.forEach(
    (el) => qs(el.formSl) && removeOn(el.formSl, "submit", listen)
  );

  itm.temp && HTML(".input-forms", itm.temp(data));
  itm.formSl && on(itm.formSl, "submit", listen);

  function listen(e) {
    e.preventDefault();
    itm.onSubmit(e.target);
  }
};
export const clientGuardEventListener = async (e) => {
  HTML(".data-content", loaderTemp());
  let eachGuard = await getData("each-guard", e.target.dataset.guardName);
  HTML(".data-content", guardReportTemp(eachGuard, "from-client"));
  on(".per-hour-input", "change", (e) => perHourInputEventListener(e));
  on(".per-hour-input", "keyup", (e) => perHourInputEventListener(e));
};
