import {
  clientGuardCardTemp,
  clientGuardSelectTemp,
  clientLoginFormTemp,
  guardReportTemp,
  loaderTemp,
} from "../../../js/components.js";
import { clientGuardEventListener } from "../../../js/eventListeners.js";
import { getData } from "../../../js/fetch.js";
import { clientLoginFormSubmit } from "../../../js/onSubmit.js";
import {
  HTML,
  addC,
  addHTML,
  on,
  onN,
  qsa,
  removeC,
} from "../../../js/selectors.js";
import { clientLoaderItems } from "../../../js/vars.js";

async function showClientDashboard(clientName) {
  clientLoaderItems.forEach((itm) => HTML(itm, loaderTemp()));
  let guardData = await getData("client-guards", null, null, clientName);

  HTML(".data-guards", "");
  guardData.forEach((obj) => addHTML(".data-guards", clientGuardCardTemp(obj)));
  HTML(".data-content", clientGuardSelectTemp());

  qsa(".client-gurad").forEach((itm) =>
    onN(itm, "click", (e) => clientGuardEventListener(e, clientName))
  );
}

HTML(".alerts", clientLoginFormTemp());
on(".client-login-form", "submit", async (e) => {
  e.preventDefault();
  let res = await clientLoginFormSubmit(e.target);
  res && (await showClientDashboard(e.target.clientName.value));
  res && removeC(".app", "hidden");
  res && addC(".alerts", "hidden");
});
