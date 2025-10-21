import Request from "../models/request.model";
import Availability from "../models/availability.model";
import { Request as ExRequest, Response } from "express";
import ApiResponse from "../utils/response";
import ApiError from "../utils/error";
import asyncHandler from "../utils/async-handler";

interface AuthenticatedRequest extends ExRequest {
  user?: { id: string; role: string };
}

export const createRequest = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { slotId } = req.body;
    const studentId = req.user?.id;

    if (!studentId) {
      throw new ApiError(401, "Unauthorized", []);
    }
    if (!slotId) {
      throw new ApiError(400, "Slot ID is required", []);
    }

    const slot = await Availability.findById(slotId);
    if (!slot || slot.isBooked) {
      throw new ApiError(400, "Slot is not available", []);
    }

    const existingRequest = await Request.findOne({
      studentId,
      slotId,
    });
    if (existingRequest) {
      throw new ApiError(400, "You have already requested this slot", []);
    }

    const newRequest = new Request({
      studentId,
      mentorId: slot.mentorId,
      slotId,
      status: "pending",
    });
    await newRequest.save();

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { request: newRequest },
          "Request created successfully"
        )
      );
  }
);

export const getRequestsForMentor = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const mentorId = req.user?.id;

    if (!mentorId) {
      throw new ApiError(401, "Unauthorized", []);
    }
    const requests = await Request.find({ mentorId }).populate("slotId");

    return res
      .status(200)
      .json(
        new ApiResponse(200, { requests }, "Requests fetched successfully")
      );
  }
);

export const getRequestForStudent = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const studentId = req.user?.id;

    if (!studentId) {
      throw new ApiError(401, "Unauthorized", []);
    }
    const requests = await Request.find({ studentId }).populate("slotId");

    return res
      .status(200)
      .json(
        new ApiResponse(200, { requests }, "Requests fetched successfully")
      );
  }
);
