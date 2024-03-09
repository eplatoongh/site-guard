const { Router } = require("express");
const router = Router();
const adminFunctions = require("../../../controllers/admin/post/index");
const Client = require("../../../models/admin/Client");
const Guard = require("../../../models/admin/Guard");
const Site = require("../../../models/admin/Site");

{
  router.post("/site/add", (req, res) => {
    adminFunctions.addData(req, res, Site);
  });
  router.post("/guard/add", (req, res) => {
    adminFunctions.addData(req, res, Guard);
  });
  router.post("/client/add", (req, res) => {
    adminFunctions.addData(req, res, Client);
  });
  router.post("/work/add", adminFunctions.workAdd);
  router.post("/if/client/exists", (req, res) =>
    adminFunctions.ifExistsName(req, res, Client)
  );
  router.post(
    "/post/site/guard/works/add",
    adminFunctions.postSiteGuardWorkAdd
  );
  router.post("/schedule/add", adminFunctions.scheduleAdd);
  router.post("/worker/schedule/work/done", adminFunctions.scheduleWorkDone);
  router.post("/client/get/reports", adminFunctions.clientReport);
}

module.exports = router;
