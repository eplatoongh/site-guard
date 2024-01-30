import {
  clientGuardSelectTemp,
  clientLoginFormTemp,
  clientSelectTemp,
  loaderTemp,
} from "../../../js/components.js";
import { getData } from "../../../js/fetch.js";
import { clientLoginFormSubmit } from "../../../js/onSubmit.js";
import { HTML, addC, on, qs, removeC } from "../../../js/selectors.js";
import { clientLoaderItems } from "../../../js/vars.js";

async function showClientDashboard(clientName, id) {
  clientLoaderItems.forEach((itm) => HTML(itm, loaderTemp()));

  HTML(".data-content", clientGuardSelectTemp());
  clientSelectTemp({
    postSiteSelectDom: qs('[name="postSite"]'),
    guardsDom: qs('[name="guards"]'),
    clientProDom: qs("[data-client-profile]"),
    contentDom: qs("[data-content]"),
    id,
    fetchClient: getData,
  });
}

HTML(".alerts", clientLoginFormTemp());
on(".client-login-form", "submit", async (e) => {
  e.preventDefault();
  let { found, id } = await clientLoginFormSubmit(e.target);
  found && (await showClientDashboard(e.target.clientName.value, id));
  found && removeC(".app", "hidden");
  found && addC(".alerts", "hidden");
});
