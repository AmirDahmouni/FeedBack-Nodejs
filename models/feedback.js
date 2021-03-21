const mongoose = require("mongoose");
const Joi = require("joi");
const { subjectSchema } = require("./subject");

const feedSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "classe",
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subject",
    required: true,
  },
  professor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  questions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "question", required: true },
  ],
  nbvotes: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const FeedBack = mongoose.model("feedback", feedSchema);
function validateFeed(feedbackverify) {
  const schema = Joi.object({
    name: Joi.string().required(),
    class: Joi.objectId().required(),
    professor: Joi.objectId().required(),
    subject: Joi.objectId().required(),
    questions: Joi.array().items(Joi.objectId()).required(),
    nbvotes: Joi.number().required(),
    date: Joi.date(),
  });
  return schema.validate(feedbackverify);
}
exports.validate = validateFeed;
exports.feedSchema = feedSchema;
exports.FeedBack = FeedBack;
