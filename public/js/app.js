import { deleteBoxTemp, loaderTemp } from "./components.js";
import { activeItems } from "./eventListeners.js";
import { HTML, addHTML, on, qs } from "./selectors.js";
import { activateItems, loaderItems } from "./vars.js";
//loaders
loaderItems.forEach((itm) => HTML(itm, loaderTemp()));
//eventListeners
activateItems.forEach((itm) =>
  on(itm.sl, "click", () => activeItems(itm, activateItems))
);
//init
qs(activateItems[0].sl).click();
