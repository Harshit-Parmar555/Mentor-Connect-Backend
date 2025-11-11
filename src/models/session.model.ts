import mongoose from "mongoose";

interface ISession extends mongoose.Document {
  mentorId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  slotId: mongoose.Types.ObjectId;
  callId: string;
  mentorToken: string;
  studentToken: string;
  status: "scheduled" | "ongoing" | "completed" | "canceled";
  startTime: Date;
  endTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new mongoose.Schema<ISession>(
  {
    mentorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    slotId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Availability",
      required: true,
    },
    callId: {
      type: String,
      required: true,
    },
    mentorToken: {
      type: String,
      required: true,
    },
    studentToken: {
      type: String,
      required: true,
    },
    status : {
      type: String,
      enum: ["scheduled", "ongoing", "completed", "canceled"],
      default: "scheduled",
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Session = mongoose.model<ISession>("Session", sessionSchema);

export { ISession };
export default Session;
