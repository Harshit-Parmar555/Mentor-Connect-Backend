import mongoose from "mongoose";

interface IRequest extends mongoose.Document {
  mentorId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  slotId: mongoose.Types.ObjectId;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const requestSchema = new mongoose.Schema<IRequest>(
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
    status: {
      type: String,
      enum: ["scheduled", "completed", "canceled"],
      default: "scheduled",
    },
  },
  { timestamps: true }
);

const Request = mongoose.model<IRequest>("Session", requestSchema);

export { IRequest };
export default Request;
