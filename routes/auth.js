
const express = require("express");
const router = express.Router();

const authController=require("../controllers/Auth")

router.post("/",authController.Authentification);



module.exports = router;
