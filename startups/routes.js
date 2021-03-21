const SubjectRoute = require("../routes/subject");
const QuestionRoute = require("../routes/question");
const AnswerRoute = require("../routes/answer");
const QuestionAnswerRoute = require("../routes/quest-rep");
const ProfessorRoute=require("../routes/professor")
const ClassRoute = require("../routes/class");
const FeedbackRoute = require("../routes/feedback");
const UserRoute = require("../routes/users");
const AuthRoute = require("../routes/auth");
const StudentRoute = require("../routes/student");
const AdminRoute = require("../routes/admin");
const mailer = require("../routes/mailer");
const error = require("../middlewares/error");
module.exports = function (app, express) {
  app.use(express.json()); // for parsing application/json we use it as middleware in pipeline return the req.body
  app.use(express.urlencoded({ extended: true })); //used to receive data under the format key,value
  app.use("/api/", mailer);
  app.use("/subject", SubjectRoute);
  app.use("/question", QuestionRoute);
  app.use("/answer", AnswerRoute);
  app.use("/questionanswer", QuestionAnswerRoute);
  app.use("/class", ClassRoute);
  app.use("/feedback", FeedbackRoute);
  app.use("/auth", AuthRoute);
  app.use("/user", UserRoute);
  app.use("/admin", AdminRoute);
  app.use("/student",StudentRoute);
  app.use("/professor", ProfessorRoute);
  app.use(error); //thow error and send status 500
};
