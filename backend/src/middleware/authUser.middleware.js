import jwt from 'jsonwebtoken';
import config from '../config/environment.js';
import { ApiError } from '../utils/ApiErrors.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const { JWT_SECRET } = config;

const isUser = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token ;
    // console.log(token)
    if (!token) {
        throw new ApiError(401, 'No token provided');
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("decoded from authUser middleware",decoded)
        req.user = decoded;
        next();
    } catch (error) {
        throw new ApiError(401, 'Invalid token');
    }
});

export { isUser };