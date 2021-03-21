const Joi = require("joi"); //it's a class
const mongoose = require("mongoose");
const { subjectSchema } = require("./subject");
const professorSchema = new mongoose.Schema({
  classes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "classe",
    },
  ],
  userData: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subject",
      required: true,
    },
  ],
});
const Professor = mongoose.model("professor", professorSchema);
function validateprof(professorverify) {
  const schema = Joi.object({
    classes: Joi.array().items(Joi.objectId()).required(),
    subjects: Joi.array().items(Joi.objectId()).required(),
    userData: Joi.objectId().required(),
  });
  return schema.validate(professorverify);
}
exports.profSchema = professorSchema;
exports.Professor = Professor;
exports.validate = validateprof;
