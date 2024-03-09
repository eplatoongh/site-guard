const { Router } = require("express");
const router = Router();

const adminGetRoutes = require("./get/index");
const adminPostRoutes = require("./post/index");
const adminDeleteRoutes = require("./delete/index");
const adminPutRoutes = require("./put/index");

router.use(adminGetRoutes);
router.use(adminPostRoutes);
router.use(adminDeleteRoutes);
router.use(adminPutRoutes);

module.exports = router;
