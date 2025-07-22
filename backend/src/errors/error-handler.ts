import type { Request, Response, NextFunction } from "express";
import type ApiError from "./api-error";

export function errorHandler(
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const statusCode = err.statusCode ?? 500;
  const status = err.status ?? "error";

  res.status(statusCode).json({
    status,
    message: err.message || "Internal Server Error",
  });
}
