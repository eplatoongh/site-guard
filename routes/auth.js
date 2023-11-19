const { Router } = require("express");
const router = Router();
const authFunctions = require("../controllers/auth");

//routes
router.get("/logout", authFunctions.get_logout);
router.post("/login", authFunctions.post_login);

//exports
module.exports = router;
