import { Request as ExpressRequest, Response } from "express";
import Request from "../models/request.model";
import ApiError from "../utils/error";
import ApiResponse from "../utils/response";
import asyncHandler from "../utils/async-handler";
import Availability from "../models/availability.model";
import Session from "../models/session.model";
import { createVideoCallSession, endSession } from "../utils/stream";
import User from "../models/user.model";

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

    const student = await User.findById(request.studentId);
    const mentor = await User.findById(request.mentorId);

    if (!student || !mentor) {
      throw new ApiError(404, "Mentor or Student not found", []);
    }

    const mentorData = {
      id: String(mentor._id),
      name: mentor.name,
      email: mentor.email,
      profile: mentor.profile,
      role: mentor.role,
    };

    const studentData = {
      id: String(student._id),
      name: student.name,
      email: student.email,
      profile: student.profile,
      role: student.role,
    };

    const videoCallData = await createVideoCallSession(mentorData, studentData);

    request.status = "approved";
    await request.save();

    await Availability.findByIdAndUpdate(request.slotId, { isBooked: true });

    const slot = await Availability.findById(request.slotId);

    const newSession = new Session({
      mentorId: request.mentorId,
      studentId: request.studentId,
      slotId: request.slotId,
      callId: videoCallData.callId,
      mentorToken: videoCallData.mentorToken,
      studentToken: videoCallData.studentToken,
      status: "scheduled",
      startTime: new Date(`${slot!.date.toDateString()} ${slot!.startTime}`),
      endTime: new Date(`${slot!.date.toDateString()} ${slot!.endTime}`),
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

export const getSessionsForUser = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?._id.toString();
    const role = req.user?.role;
    let sessions;
    if (role === "mentor") {
      sessions = await Session.find({ mentorId: userId })
        .populate("mentorId", "name username profile email")
        .populate("studentId", "name username profile email")
        .sort({ startTime: 1 });
    } else {
      sessions = await Session.find({ studentId: userId })
        .populate("mentorId", "name username profile email")
        .populate("studentId", "name username profile email")
        .sort({ startTime: 1 });
    }
    return res
      .status(200)
      .json(
        new ApiResponse(200, { sessions }, "Sessions fetched successfully")
      );
  }
);

export const getSessionDetails = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { sessionId } = req.params;
    const userId = req.user?._id.toString();

    const session = await Session.findById(sessionId);
    if (
      !session ||
      (session.mentorId.toString() !== userId &&
        session.studentId.toString() !== userId)
    ) {
      throw new ApiError(404, "Session not found or access denied", []);
    }

    const isParticipant =
      session.mentorId.toString() === userId ||
      session.studentId.toString() === userId;
    if (!isParticipant) {
      throw new ApiError(403, "Access denied to this session", []);
    }

    const userToken =
      session.mentorId.toString() === userId
        ? session.mentorToken
        : session.studentToken;

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          sessionId: session._id,
          callId: session.callId,
          token: userToken,
          status: session.status,
          participants: {
            mentorId: session.mentorId,
            studentId: session.studentId,
          },
          schedule: {
            startTime: session.startTime,
            endTime: session.endTime,
          },
        },
        "Session details fetched successfully"
      )
    );
  }
);

export const updateSessionStatus = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { sessionId, status } = req.body;

    const session = await Session.findByIdAndUpdate(
      sessionId,
      {
        status,
      },
      { new: true }
    );

    if (!session) {
      throw new ApiError(404, "Session not found", []);
    }

    if (status === "completed" || status === "canceled") {
      // End the Stream call
      await endSession(session.callId);
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, { session }, "Session status updated successfully")
      );
  }
);
