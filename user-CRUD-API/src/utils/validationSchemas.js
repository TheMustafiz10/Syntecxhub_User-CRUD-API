
import Joi from 'joi';


// Create user validation schema
export const createUserSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 2 characters long'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'string.empty': 'Email is required'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters long',
    'string.empty': 'Password is required'
  }),
  age: Joi.number().min(1).max(150).optional(),
  role: Joi.string().valid('user', 'admin', 'moderator').optional(),
  phoneNumber: Joi.string().pattern(/^\+?[\d\s-]{10,}$/).optional(),
  address: Joi.object({
    street: Joi.string().optional(),
    city: Joi.string().optional(),
    country: Joi.string().optional(),
    zipCode: Joi.string().optional()
  }).optional()
});





// Update user validation schema
export const updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(50).optional(),
  email: Joi.string().email().optional(),
  age: Joi.number().min(1).max(150).optional(),
  role: Joi.string().valid('user', 'admin', 'moderator').optional(),
  isActive: Joi.boolean().optional(),
  phoneNumber: Joi.string().pattern(/^\+?[\d\s-]{10,}$/).optional(),
  address: Joi.object({
    street: Joi.string().optional(),
    city: Joi.string().optional(),
    country: Joi.string().optional(),
    zipCode: Joi.string().optional()
  }).optional()
});





// User ID validation schema
export const userIdSchema = Joi.object({
  id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
    'string.pattern.base': 'Invalid user ID format'
  })
});
