import { Request, Response } from "express";
import User, { IUser } from "../models/user.model";
import ApiResponse from "../utils/response";
import ApiError from "../utils/error";
import asyncHandler from "../utils/async-handler";
import { auth } from "../configs/firebase";
import generateToken from "../utils/jwt";
import { uploadToFirebase } from "../utils/firebase.operations";

interface AuthenticatedRequest extends Request {
  user?: IUser;
}

export const signUp = asyncHandler(async (req: Request, res: Response) => {
  const { idToken } = req.body;
  if (!idToken) {
    throw new ApiError(400, "ID token is required", []);
  }
  const decodedToken = await auth.verifyIdToken(idToken);
  const { email, name, picture } = decodedToken;
  let user = await User.findOne({ email });
  if (!user) {
    user = new User({ email, name, profile: picture });
    await user.save();
  }
  const token = generateToken(String(user._id));
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  return res
    .status(200)
    .json(new ApiResponse(200, { user }, "Signup successful"));
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie("token");
  return res.status(200).json(new ApiResponse(200, {}, "Logout successful"));
});

export const onBoardUser = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { username, bio, skills, role, workingAt, yearsOfExperience } =
      req.body;
    const file = req.file;
    if (!username || !bio || !skills || !role) {
      throw new ApiError(400, "All fields are required", []);
    }
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new ApiError(400, "Username already taken", []);
    }

    let profileUrl = "";
    if (file) {
      const { publicUrl } = await uploadToFirebase(file);
      profileUrl = publicUrl;
    }

    const userId = req.user?._id;
    const user = await User.findByIdAndUpdate(
      userId,
      {
        username,
        bio,
        skills,
        role,
        profile: profileUrl,
        workingAt,
        yearsOfExperience,
        onBoarded: true,
      },
      { new: true }
    );
    return res
      .status(200)
      .json(new ApiResponse(200, { user }, "Onboarding successful"));
  }
);

export const checkAuth = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user;
    return res
      .status(200)
      .json(new ApiResponse(200, { user }, "User is authenticated"));
  }
);
