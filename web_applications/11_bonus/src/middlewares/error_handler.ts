import { ErrorRequestHandler } from "express";
import { HttpError } from "../errors/HttpError";
import { ZodError } from "zod";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    return res.status(err.status).json({ message: err.message });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Validation error",
      issues: err.issues 
    });
  }

  if (err instanceof Error) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }

  return res.status(500).json({ message: "An unexpected error occurred" });
};