const { Router } = require("express");
const router = Router();
const adminFunctions = require("../../../controllers/admin/get/index");
const Client = require("../../../models/admin/Client");
const Guard = require("../../../models/admin/Guard");
const Site = require("../../../models/admin/Site");

{
  router.get("/site/get/:skip/:limit/:clientID", (req, res) =>
    adminFunctions.getLimitedData(req, res, Site, "site")
  );
  router.get("/guard/get/:skip/:limit/:clientID/:postSiteID", (req, res) =>
    adminFunctions.getLimitedData(req, res, Guard, "guard")
  );
  router.get("/client/get/:skip/:limit", (req, res) =>
    adminFunctions.getLimitedData(req, res, Client)
  );
  router.get("/name/guard/get/:nameData/:month", (req, res) =>
    adminFunctions.getGuardByName(req, res, Guard)
  );
  router.get(
    "/client/guards/:clientName/:skip/:limit",
    adminFunctions.getClientguards
  );
  router.get(
    "/client/each/guard/get/:nameData/:month/:clientName",
    adminFunctions.getEachClientGuards
  );
  router.get("/get/a/client/:id", adminFunctions.getAclient);
  router.get(
    "/get/clients/with/post/site",
    adminFunctions.getClientsWithPostSite
  );
  router.get(
    "/get/guards/from/post/site/:clientID/:postSiteID",
    adminFunctions.getGuardsFromPostSite
  );
  router.get(
    "/get/works/of/a/guard/:clientID/:postSiteID/:guardID",
    adminFunctions.getWorksOfAguard
  );
  router.get("/schedule/get/:date", adminFunctions.getSchedule);
  router.get("/schedule/get/guard/:guardId", adminFunctions.getScheduleGuard);
}

module.exports = router;
