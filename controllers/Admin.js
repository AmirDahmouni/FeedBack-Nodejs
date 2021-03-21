const { Admin, validate } = require("../models/admin");

exports.getAllAdmins=async (req, res) => {
    try {
      const admins = await Admin.find();
      if (!admins) return res.status(400).send("no admins found !");
      return res.send(admins);
    } catch (ex) {
      next(ex);
    }
  }
  exports.getFeedbacks=async (req, res) => {
    try {
      var feedbacks = await Admin.find({ userData: req.user._id })
        .populate({
          path: "feedbacks",
          select: "-questions",
          populate: { path: "class", select: "filiere niveau groupe " },
        })
        .populate({
          path: "feedbacks",
          select: "-questions",
          populate: { path: "professor", select: "name lastname " },
        })
        .populate({
          path: "feedbacks",
          select: "-questions",
          populate: { path: "subject" },
        });
      feedbacks = feedbacks[0].feedbacks;
  
      res.send(feedbacks);
    } catch (ex) {
      next(ex);
    }
  }
  exports.getAdminById=async (req, res) => {
    try {
      const admin = await Admin.findById({ _id: req.params.id });
      if (!admin) return res.status(400).send("admin not found !");
      return res.send(admin);
    } catch (ex) {
      next(ex);
    }
  }
  exports.removeAdmin=async (req, res) => {
    try {
      const admin = await Admin.findByIdAndDelete({ _id: req.params.id });
      if (!admin) return res.status(404).send("admin not found");
      return res.send(admin);
    } catch (ex) {
      next(ex);
    }
  }
  exports.addAdmin=async (req, res) => {
    try {
      const { error } = validate(req.body);
      if (error) return res.status(400).send(error.message);
  
      const admin = new Admin({
        feedbacks: req.body.feedbacks,
        userData: req.body.userData,
      });
      await admin.save();
      res.send(admin);
    } catch (ex) {
      next(ex);
    }
  }