import { Response } from "express";
import { AuthService } from "../services/AuthService";
import { IRequestUser } from "../../../shared/types/IRequestUser";

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
        user,
      });
    } catch (error: any) {
      console.error("Erro ao registrar usuário:", error);
      res.status(400).json({ message: error.message });
    }
  }
}

export default new AuthController();
