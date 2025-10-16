import config from '../config/environment.js';
const { NODE_ENV } = config;


const globalErrorHandler = (err, req, res, next) => {

  const statusCode = err.statusCode || 500;

  const response = {
    success: false,
    message:
      statusCode >= 500
        ? 'Internal server error'
        : err.message || 'Something went wrong',
  };

  if (NODE_ENV === 'development') {
    response.stack = err.stack;
    response.error = err;
  }

  res.status(statusCode).json(response);
};

export default globalErrorHandler;
