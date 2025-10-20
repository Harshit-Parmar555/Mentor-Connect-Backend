import User from "../models/user.model";
import { Request, Response } from "express";
import ApiResponse from "../utils/response";
import ApiError from "../utils/error";
import asyncHandler from "../utils/async-handler";

export const getAllMentor = asyncHandler(
  async (req: Request, res: Response) => {
    const mentors = await User.find({ role: "mentor" });
    return res
      .status(200)
      .json(new ApiResponse(200, { mentors }, "Mentors fetched successfully"));
  }
);



