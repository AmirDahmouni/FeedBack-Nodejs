const Joi = require("joi"); //it's a class
const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  avaible: { type: Boolean, required: true },
});

const Subject = mongoose.model("subject", subjectSchema);
function validatesubject(subjectverify) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(subjectverify);
}

exports.subjectSchema = subjectSchema;
exports.Subject = Subject;
exports.validate = validatesubject;
