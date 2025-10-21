import { Request as ExpressRequest, Response } from "express";
import Request from "../models/request.model";
import ApiError from "../utils/error";
import ApiResponse from "../utils/response";
import asyncHandler from "../utils/async-handler";
import Availability from "../models/availability.model";
import Session from "../models/session.model";

interface AuthenticatedRequest extends ExpressRequest {
  user?: { _id: string; role: string };
}

export const approveRequest = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { requestId } = req.body;
    if (!requestId) {
      throw new ApiError(400, "Request ID is required", []);
    }

    const request = await Request.findById(requestId);
    if (
      !request ||
      request.status !== "pending" ||
      request.mentorId.toString() !== req.user?._id.toString()
    ) {
      throw new ApiError(404, "Request not found or cannot be approved", []);
    }

    request.status = "scheduled";
    await request.save();

    await Availability.findByIdAndUpdate(request.slotId, { isBooked: true });

    const slot = await Availability.findById(request.slotId);
    const newSession = new Session({
      mentorId: request.mentorId,
      studentId: request.studentId,
      slotId: request.slotId,
      streamToken: "generate-stream-token-here",
      startTime: slot!.startTime,
      endTime: slot!.endTime,
    });
    await newSession.save();

    await Request.updateMany(
      {
        slotId: request.slotId,
        _id: { $ne: request._id },
        status: "pending",
      },
      { status: "rejected" }
    );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { request, session: newSession },
          "Request approved and session created successfully"
        )
      );
  }
);

export const declineRequest = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { requestId } = req.body;
    if (!requestId) {
      throw new ApiError(400, "Request ID is required", []);
    }
    const request = await Request.findById(requestId);
    if (!request || request.mentorId.toString() !== req.user?._id.toString()) {
      throw new ApiError(404, "Request not found or cannot be declined", []);
    }
    request.status = "canceled";
    await request.save();
    return res
      .status(200)
      .json(new ApiResponse(200, { request }, "Request declined successfully"));
  }
);
