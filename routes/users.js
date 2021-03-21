const express = require("express");

const mongoose = require("mongoose");
const router = express.Router();
const Joi = require("joi");
const validateObjectId = require("../middlewares/validateObjectId");
const auth = require("../middlewares/auth");
const userController=require("../controllers/User")

router.get("/:id", userController.getUserById);
router.get("/me", auth, userController.getUserByToken);
router.get("/",userController.getAllUsers);
router.delete("/:id", validateObjectId, userController.removeUser);
router.post("/", userController.registerNewUser);

module.exports = router;
