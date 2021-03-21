const Joi = require("joi"); //it's a class
const mongoose = require("mongoose");
const classSchema = new mongoose.Schema({
  filiere: { type: String, required: true, minlength: 3 },
  niveau: { type: Number, required: true, min: 1, max: 3 },
  groupe: { type: Number, required: true },
  subjects: [
    { type: mongoose.Schema.Types.ObjectId, ref: "subject", required: true },
  ],
  avaible: { type: Boolean, required: true },
});
const Class = mongoose.model("classe", classSchema);
function validateclass(classverify) {
  const schema = Joi.object({
    filiere: Joi.string().min(3).required(),
    niveau: Joi.number().min(1).max(3).required(),
    groupe: Joi.number().min(1).required(),
    subjects: Joi.array().items(Joi.objectId()).required(),
  });
  return schema.validate(classverify);
}
exports.classSchema = classSchema;
exports.Class = Class;
exports.validate = validateclass;
