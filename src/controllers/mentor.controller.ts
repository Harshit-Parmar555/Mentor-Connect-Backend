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

export const getMentorById = asyncHandler(
  async (req: Request, res: Response) => {
    const mentorId = req.params.id;
    if (!mentorId) {
      throw new ApiError(400, "Bad Request: Mentor ID is required.");
    }
    const mentor = await User.findById(mentorId);
    if (!mentor || mentor.role !== "mentor") {
      throw new ApiError(404, "Mentor not found.");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, { mentor }, "Mentor fetched successfully"));
  }
);

export const getMentorByUsername = asyncHandler(
  async (req: Request, res: Response) => {
    const { username } = req.params;
    if (!username) {
      throw new ApiError(400, "Bad Request: Username is required.");
    }
    const mentor = await User.findOne({ username, role: "mentor" });
    if (!mentor) {
      throw new ApiError(404, "Mentor not found.");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, { mentor }, "Mentor fetched successfully"));
  }
);
