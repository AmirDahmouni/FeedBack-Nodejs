const Joi = require("joi"); //it's a class
const mongoose = require("mongoose");
const questrepSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "question",
    required: true,
  },
  answer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "answer",
    required: true,
  },
  feedback: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "feedback",
    required: true,
  },
});
const Questrep = mongoose.model("questrep", questrepSchema);
function validatequestrep(questrepverify) {
  const schema = Joi.object({
    question: Joi.objectId().required(),
    answer: Joi.objectId().required(),
    feedback: Joi.objectId().required(),
  });
  return schema.validate(questrepverify);
}
exports.Questrep = Questrep;
exports.validate = validatequestrep;
