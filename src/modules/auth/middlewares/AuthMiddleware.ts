import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IRequestUser } from "../../../shared/types/IRequestUser";

export class AuthMiddleware {
  static optional(req: IRequestUser, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      const decode = jwt.verify(token!, process.env.JWT_KEY!);
      req.user = decode;
      next();
    } catch (error) {
      res.status(401).send({ message: "Falha na autenticação", error });
    }
  }
}
