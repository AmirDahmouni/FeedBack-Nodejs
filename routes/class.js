const express = require("express");
const router = express.Router();
const validateObjectId = require("../middlewares/validateObjectId");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const classController=require("../controllers/Class")

router.get("/",auth, admin,classController.getAllclasses);
router.get("/:id", validateObjectId, classController.getclassById);
router.get("/getsubjectsbyIdclass/:id", auth, admin, classController.getSubjectsByClassId);
router.delete("/:id", validateObjectId, classController.removeClass);
router.patch("/:id", validateObjectId, classController.deleteClass);
router.post("/", classController.addClass);

module.exports = router;
