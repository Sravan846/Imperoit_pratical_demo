const joi = require("joi");

const registerSchema = async (req, res, next) => {
  const schema = joi.object({
    name: joi.string().min(3).required().label("name"),
    email: joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: joi.string().min(6).max(20).required().label("password"),
    gender: joi.string().valid('male', 'female').required().label("gender"),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.message, isSuccess: false });
  } else {
    next();
  }
};
const loginSchema = async (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: joi.string().min(3).required().label("password")
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.message, isSuccess: false });
  } else {
    next();
  }
};
const otpValidator = async (req, res, next) => {
  try {
    const Schema = joi.object({
      otp: joi.number().label("otp"),
      password: joi.string().required().label("Password"),
    });
    const response = Schema.validate(req.body);
    if (response.error) {
      res.status(400).json({ message: response.error.message });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
const taskValidation = async (req, res, next) => {
  const Schema = joi.object({
    title: joi.string().required().label("Title"),
    desc: joi.string().required().label("Description"),
    priority: joi.string().valid("high", "medium", "low").required().label("priority"),
    shared: joi.string().label("shared"),
    toDate: joi.string().required().label("toDate"),
  })
  const { error } = Schema.validate(req.body)
  if (error) {
    return res.status(203).send({ message: error.message })
  } else {
    next()
  }
}


module.exports = {
  registerSchema,
  loginSchema,
  otpValidator,
  taskValidation
};
