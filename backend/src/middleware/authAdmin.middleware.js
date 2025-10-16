import jwt from 'jsonwebtoken';
import config from '../config/environment.js';
import { ApiError } from '../utils/ApiErrors.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const { JWT_SECRET } = config;

const isAdmin = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    throw new ApiError(401, 'No token provided');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'admin') {
      throw new ApiError(403, 'Access denied: Admins only');
    }
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(401, 'Invalid token');
  }
});

export { isAdmin };
