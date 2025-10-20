import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/error";

interface OnBoardedRequest extends Request {
  user?: {
    onBoarded: boolean;
    [key: string]: any;
  };
}

export const checkOnBoarded = (
  req: OnBoardedRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user?.onBoarded) {
    return next(
      new ApiError(
        403,
        "Forbidden: You need to complete the onboarding process to access this resource."
      )
    );
  }
  next();
};
