import mongoose from "mongoose";

interface IUser extends mongoose.Document {
  name: string;
  username: string;
  email: string;
  workingAt?: string;
  yearsOfExperience?: number;
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
    username: { type: String, unique: true, sparse: true },
    email: { type: String, required: true, unique: true },
    workingAt: { type: String },
    yearsOfExperience: { type: Number },
    profile: { type: String },
    bio: { type: String },
    skills: { type: [String], default: [] },
    role: { type: String, enum: ["mentor", "student"], default: null },
    onBoarded: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export { IUser };
export default User;
