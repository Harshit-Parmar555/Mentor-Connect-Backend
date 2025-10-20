import { Request, Response } from "express";
import ApiResponse from "../utils/response";
import ApiError from "../utils/error";
import asyncHandler from "../utils/async-handler";
import Availability from "../models/availability.model";

interface AuthenticatedRequest extends Request {
  user?: { id: string; role: string };
}

export const addSlot = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { date, startTime, endTime } = req.body;
    const mentorId = req.user?.id;

    if (!mentorId) {
      throw new ApiError(401, "Unauthorized", []);
    }
    if (!date || !startTime || !endTime) {
      throw new ApiError(400, "All fields are required", []);
    }

    const overlappingSlot = await Availability.findOne({
      mentorId,
      date,
      $or: [
        {
          startTime: { $lt: endTime, $gte: startTime },
        },
        {
          endTime: { $gt: startTime, $lte: endTime },
        },
        {
          startTime: { $lte: startTime },
          endTime: { $gte: endTime },
        },
      ],
    });
    if (overlappingSlot) {
      throw new ApiError(400, "The slot overlaps with an existing slot", []);
    }

    const newSlot = new Availability({
      mentorId,
      date,
      startTime,
      endTime,
    });
    await newSlot.save();

    return res
      .status(201)
      .json(new ApiResponse(201, { slot: newSlot }, "Slot added successfully"));
  }
);

