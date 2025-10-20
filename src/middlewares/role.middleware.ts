import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/error";

interface AuthenticatedRequest extends Request {
  user?: {
    role: "student" | "mentor" | "admin" | string;
    [key: string]: any;
  };
}

export const roleMiddleware = (role: "student" | "mentor") => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== role) {
      return next(
        new ApiError(
          403,
          "Forbidden: You do not have the required role to access this resource."
        )
      );
    }
    next();
  };
};
