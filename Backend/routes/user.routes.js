/* Import des modules necessaires */
const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.controller");

const limiter = require("../middleware/GuardRateLimit");


/* Routage User */
router.post("/signup", userCtrl.signup);
router.post("/login", limiter, userCtrl.login);

module.exports = router;



