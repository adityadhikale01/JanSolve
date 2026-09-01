import Joi from "joi";

const userSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .max(30)
    .pattern(/^[A-Za-z\s]+$/)
    .required()
    .messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 3 characters",
      "string.max": "Name cannot exceed 30 characters",
      "string.pattern.base": "Name can only contain letters and spaces",
    }),

  email: Joi.string()
    .trim()
    .email()
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
    }),

  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).*$/)
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters long",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),

    avatar: Joi.string()
        .uri()
        .allow(null, "")
        .optional()
        .messages({
            "string.uri": "Avatar must be a valid URL.",
        }),

    role: Joi.string()
        .valid("user", "host", "admin")
        .default("user")
        .messages({
            "any.only": "Role must be user, host, or admin.",
        }),
});


export default userSchema;