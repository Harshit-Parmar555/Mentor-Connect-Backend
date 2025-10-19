import mongoose from "mongoose";

interface IUser extends mongoose.Document {
  name: string;
  username: string;
  email: string;
  profile: string;
  bio: string;
  skills: string[];
  role: "mentor" | "student";
  onBoarded: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    profile: { type: String },
    bio: { type: String },
    skills: { type: [String], default: [] },
    role: { type: String, enum: ["mentor", "student"], required: true },
    onBoarded: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
