const { Router } = require("express");
const router = Router();
const adminFunctions = require("../controllers/admin");
const Client = require("../models/admin/Client");
const Guard = require("../models/admin/Guard");
const Site = require("../models/admin/Site");

//get
router.get("/site/get/:skip/:limit", (req, res) =>
  adminFunctions.getLimitedData(req, res, Site)
);
router.get("/guard/get/:skip/:limit", (req, res) =>
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
router.get("/schedule/get/:date/:skip/:limit", adminFunctions.getSchedule);

//post
router.post("/site/add", (req, res) => {
  adminFunctions.addData(req, res, Site);
});
router.post("/guard/add", (req, res) => {
  adminFunctions.addData(req, res, Guard, "guard");
});
router.post("/client/add", (req, res) => {
  adminFunctions.addData(req, res, Client);
});
router.post("/work/add", adminFunctions.workAdd);
router.post("/if/client/exists", (req, res) =>
  adminFunctions.ifExistsName(req, res, Client)
);
router.post("/post/site/guard/works/add", adminFunctions.postSiteGuardWorkAdd);
router.post("/schedule/add", adminFunctions.scheduleAdd);

//delete
router.delete("/data/site/delete/:id", (req, res) =>
  adminFunctions.deleteData(req, res, Site)
);
router.delete("/data/guard/delete/:id/:guardName", (req, res) =>
  adminFunctions.deleteData(req, res, Guard, "guard")
);
router.delete("/data/client/delete/:id", (req, res) =>
  adminFunctions.deleteData(req, res, Client)
);

//update
router.put("/guard/report/update", adminFunctions.updateReport);
router.put(
  "/update/client/add/post/site",
  adminFunctions.updateClientAddPostSite
);

//exports
module.exports = router;
