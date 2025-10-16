import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from 'jsonwebtoken'
import config from '../config/environment.js';
import bcrypt from 'bcrypt';
const { JWT_SECRET } = config;



const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
 
  if (!name || !email || !password) {
    throw new ApiError(400, 'Name, email, and password are required');
  }
  
  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    throw new ApiError(400, 'User already exists with this email');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || 'user'
  });

  const token = jwt.sign({
    id: user._id,
  }, JWT_SECRET, { expiresIn: '1d' });

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });


  return res.status(201).json(
    new ApiResponse(200, user, "User Created successfully")
  )
});


const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, 'Email and password are required');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid email or password');
  }
  const token = jwt.sign(
    { id: user._id, role: user.role },
    JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });

  return res.status(200).json(new ApiResponse(200, user, 'Login successful'));
});

const getProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId)
    .select('name email phone address dateOfBirth emails role createdAt updatedAt')
    .lean();

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json(
    new ApiResponse(200, user, "User profile fetched successfully")
  );
});



const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId)
    .select('name email phone address dateOfBirth emails role createdAt updatedAt')
    .lean();

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json(
    new ApiResponse(200, user, "User profile fetched successfully")
  );
});



const getAdminProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId)
    .select('name email phone address dateOfBirth emails role createdAt updatedAt')
    .lean();

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json(
    new ApiResponse(200, user, "User profile fetched successfully")
  );
});

const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });

  return res.status(200).json(
    new ApiResponse(200, null, "Logout successful")
  );
});


export { registerUser, loginUser, getProfile, getAdminProfile, getUserProfile, logoutUser };