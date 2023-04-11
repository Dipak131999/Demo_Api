const Joi = require("joi");

module.exports.registerUser = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  mobileNumber: Joi.string().min(10).max(10).required(),
  password: Joi.string().required(),
  address: Joi.string().optional(),
  isActive: Joi.boolean(),
});

module.exports.notes = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  userId: Joi.number().required(),
});
