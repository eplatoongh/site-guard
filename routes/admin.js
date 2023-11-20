const { Router } = require("express");
const router = Router();
const adminFunctions = require("../controllers/admin");
const Client = require("../models/admin/Client");
const Guard = require("../models/admin/Guard");
const Site = require("../models/admin/Site");
const Work = require("../models/admin/Work");

//get
router.get("/site/get/:skip/:limit", (req, res) =>
  adminFunctions.getLimitedData(req, res, Site)
);
router.get("/guard/get/:skip/:limit", (req, res) =>
  adminFunctions.getLimitedData(req, res, Guard)
);
router.get("/client/get/:skip/:limit", (req, res) =>
  adminFunctions.getLimitedData(req, res, Client)
);
router.get("/work/get/:skip/:limit", (req, res) =>
  adminFunctions.getLimitedData(req, res, Work)
);
router.get("/name/guard/get/:nameData/:month", (req, res) =>
  adminFunctions.getGuardByName(req, res, Guard)
);
router.get(
  "/client/guards/:clientName/:skip/:limit",
  adminFunctions.getClientguards
);
//post
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
//exports
module.exports = router;
