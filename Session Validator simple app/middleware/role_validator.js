const roleValidator = (req, res, next) => {
  const role = req.session.role;
  if (role.toLowerCase() === "admin") {
    next();
  } else {
    res.sendStatus(403);
  }
};

module.exports = roleValidator;
