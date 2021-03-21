const express = require("express");
const router = express.Router();
const validateObjectId = require("../middlewares/validateObjectId");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const adminController=require("../controllers/Admin")

router.get("/",adminController.getAllAdmins );
router.get("/getfeedbacks", auth, admin, adminController.getFeedbacks);
router.get("/:id", validateObjectId, adminController.getAdminById);
router.delete("/:id", validateObjectId,adminController.removeAdmin );
router.post("/", adminController.addAdmin);
module.exports = router;
