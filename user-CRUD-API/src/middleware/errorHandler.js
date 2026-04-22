
export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.error('Error:', err);


  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = { statusCode: 404, message };
  }

  // Duplicate key Error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    const message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
    error = { statusCode: 409, message };
  }

  
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = { statusCode: 400, message };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};
