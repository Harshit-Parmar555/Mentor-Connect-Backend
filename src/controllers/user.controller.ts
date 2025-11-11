import User from "../models/user.model";
import { Request, Response } from "express";
import ApiResponse from "../utils/response";
import ApiError from "../utils/error";
import asyncHandler from "../utils/async-handler";

export const getUserByUsername = asyncHandler(
  async (req: Request, res: Response) => {
    const { username } = req.params;
    if (!username) {
      throw new ApiError(400, "Bad Request: Username is required.");
    }
    const user = await User.findOne({ username });
    if (!user) {
      throw new ApiError(404, "User not found.");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, { user }, "User fetched successfully"));
  }
);
