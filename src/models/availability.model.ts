import mongoose from "mongoose";

interface IAvailability extends mongoose.Document {
  mentorId: mongoose.Types.ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const availabilitySchema = new mongoose.Schema<IAvailability>(
  {
    mentorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isBooked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Availability = mongoose.model<IAvailability>(
  "Availability",
  availabilitySchema
);

export { IAvailability };
export default Availability;
