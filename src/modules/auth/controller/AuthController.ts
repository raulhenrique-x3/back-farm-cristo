import { Response } from "express";
import { AuthService } from "../services/AuthService";
import { IRequestUser } from "../../../shared/types/IRequestUser";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../shared/utils/generateTokens";

const authService = new AuthService();

class AuthController {
  public async register(req: IRequestUser, res: Response) {
    const { name, email, password, role } = req.body;
    const masterKey = req.headers["x-master-key"] as string | undefined;

    // const currentUser = req.user;

    try {
      const user = await authService.register(
        { name, email, password, role },
        masterKey
        // currentUser?.role
      );

      res.status(201).json({
        message: "Usuário criado com sucesso",
        userId: user.id,
      });
    } catch (error: any) {
      console.error("Erro ao registrar usuário:", error);
      res.status(400).json({ message: error.message });
    }
  }

  public async login(req: IRequestUser, res: Response) {
    const { email, password } = req.body;

    try {
      const { id } = await authService.login(email, password);
      console.log("User logged in with ID:", id);
      const token = generateAccessToken(id);
      const refreshToken = generateRefreshToken(id);

      res.status(200).json({
        id,
        token,
        refreshToken,
      });
    } catch (error: any) {
      console.error("Erro ao fazer login:", error);
      res.status(400).json({ message: error.message });
    }
  }
}

export default new AuthController();
