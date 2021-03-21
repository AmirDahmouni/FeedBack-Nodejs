const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "class",
    required: true,
  },

  feedbacks: [{ type: mongoose.Schema.Types.ObjectId, ref: "feedback" }],
  userData: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});
const Student = mongoose.model("student", studentSchema);
function validatestudent(studentverify) {
  const schema = Joi.object({
    class: Joi.objectId(),
    feedbacks: Joi.array().items(Joi.objectId()),
    userData: Joi.objectId(),
  });
  return schema.validate(studentverify);
}
exports.Student = Student;
exports.validate = validatestudent;
