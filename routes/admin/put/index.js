const { Router } = require("express");
const router = Router();
const adminFunctions = require("../../../controllers/admin/put/index");

{
  router.put("/guard/report/update", adminFunctions.updateReport);
  router.put(
    "/update/client/add/post/site",
    adminFunctions.updateClientAddPostSite
  );
  router.put("/guard/time/report/update", adminFunctions.updateTimeReport);
  router.put("/schedule/update/track-info", adminFunctions.updateTrackInfo);
}

module.exports = router;
