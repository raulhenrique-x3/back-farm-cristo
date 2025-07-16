import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function generateAccessToken(id: number) {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: "3600s",
  });
}

export function generateRefreshToken(id: number) {
  return jwt.sign({ id }, process.env.JWT_SECRET!);
}
