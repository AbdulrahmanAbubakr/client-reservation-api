const allowedTypes = ["web-development", "app-development", "social-media"];

const validateType = (req, res, next) => {
  const { type } = req.params;

  if (!allowedTypes.includes(type)) {
    return res.status(400).json({ message: " Invalid type provides" });
  }
  req.devType = type;
  next();
};

module.exports = validateType;
