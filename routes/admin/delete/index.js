const { Router } = require("express");
const router = Router();
const adminFunctions = require("../../../controllers/admin/delete/index");
const Client = require("../../../models/admin/Client");
const Guard = require("../../../models/admin/Guard");
const Site = require("../../../models/admin/Site");

{
  router.delete("/data/site/delete/:id", (req, res) =>
    adminFunctions.deleteData(req, res, Site)
  );
  router.delete("/data/guard/delete/:id/:guardName", (req, res) =>
    adminFunctions.deleteData(req, res, Guard, "guard")
  );
  router.delete("/data/client/delete/:id", (req, res) =>
    adminFunctions.deleteData(req, res, Client)
  );
}

module.exports = router;
