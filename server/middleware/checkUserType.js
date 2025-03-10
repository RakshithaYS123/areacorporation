module.exports = function (userType) {
  return (req, res, next) => {
    if (req.user.userType !== userType) {
      return res.status(403).json({ msg: "Access denied" });
    }
    next();
  };
};
