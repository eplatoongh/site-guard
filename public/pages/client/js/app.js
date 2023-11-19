import {
  clientGuardCardTemp,
  clientGuardSelectTemp,
  guardReportTemp,
  loaderTemp,
} from "../../../js/components.js";
import { clientGuardEventListener } from "../../../js/eventListeners.js";
import { getData } from "../../../js/fetch.js";
import { HTML, addHTML, onN, qsa } from "../../../js/selectors.js";
import { clientLoaderItems } from "../../../js/vars.js";

clientLoaderItems.forEach((itm) => HTML(itm, loaderTemp()));
(async () => {
  let guardData = await getData(".report-li");

  HTML(".data-guards", "");
  guardData.forEach((obj) => addHTML(".data-guards", clientGuardCardTemp(obj)));
  HTML(".data-content", clientGuardSelectTemp());

  qsa(".client-gurad").forEach((itm) =>
    onN(itm, "click", (e) => clientGuardEventListener(e))
  );
})();
