
import { createUserSchema, updateUserSchema, userIdSchema } from '../utils/validationSchemas.js';

export const validateCreateUser = (req, res, next) => {
  const { error } = createUserSchema.validate(req.body, { abortEarly: false });
  
  if (error) {
    const errors = error.details.map(detail => ({
      field: detail.path[0],
      message: detail.message
    }));
    
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }
  
  next();
};

export const validateUpdateUser = (req, res, next) => {
  const { error } = updateUserSchema.validate(req.body, { abortEarly: false });
  
  if (error) {
    const errors = error.details.map(detail => ({
      field: detail.path[0],
      message: detail.message
    }));
    
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }
  
  next();
};

export const validateUserId = (req, res, next) => {
  const { error } = userIdSchema.validate({ id: req.params.id });
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Invalid user ID format',
      error: error.details[0].message
    });
  }
  
  next();
};
