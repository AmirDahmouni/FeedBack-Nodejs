const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "SMPT",
  port: 535,
  auth: {
    user: "@adresse",
    pass: "password",
  },
});
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages!");
  }
});

router.post("/access", (req, res, next) => {
  const email = req.body.email;
  const subject = req.body.subject;
  const message = req.body.message;
  var mail = {
    from: email,
    to: "@adresse",
    subject: subject,
    html: `<h1>subject :${subject}</h1><p>message: ${message}</p><p>sender: ${email}</p>`,
  };
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({ status: "fail" });
    } else {
      res.json({ status: "success" });
    }
  });
});
router.post("/newfeedback", (req, res, next) => {
  const email = req.body.email;
  const subject = "new Feedback";
  const message = req.body.message;
  var mail = {
    from: "@adresse-sender",
    to: email,
    subject: subject,
    html: `<h1>subject :${subject}</h1><p>message: ${message}</p>`,
  };
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({ status: "fail" });
    } else {
      res.json({ status: "success" });
    }
  });
});
module.exports = router;
