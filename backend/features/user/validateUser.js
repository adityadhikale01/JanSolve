import userSchema from './userSchema.js';

const validateUser = (req, res, next) => {
    console.log("Inside validate User");
  const { error, value } = userSchema.validate(req.body, {
    abortEarly: false, // Return all validation errors
    stripUnknown: true, // Remove fields not in the schema
  });

  if (error) {
    return res.status(400).json({
      success: false,
      errors: error.details.map((err) => ({
        field: err.path[0],
        message: err.message,
      })),
    });
  }

  // Replace req.body with the validated/sanitized values
  req.body = value;

  next();
};

export  default    validateUser;