import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "/server" });

export function generateAccessToken(id: string) {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: "3600s",
  });
}

export function generateRefreshToken(id: string) {
  return jwt.sign({ id }, process.env.JWT_SECRET!);
}
