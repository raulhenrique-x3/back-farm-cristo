import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/UserRepository";
import { CreateUserDTO } from "../dtos/CreateUserDto";

const MASTER_KEY = process.env.MASTER_KEY;

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(
    data: CreateUserDTO,
    masterKeyHeader?: string,
    currentUserRole?: string
  ) {
    const { name, email, password, role } = data;
    console.log("Dados recebidos:", data);
    console.log("Master Key Header:", masterKeyHeader);
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("Email já está em uso");
    }

    if (role === "master") {
      if (masterKeyHeader !== MASTER_KEY) {
        throw new Error("Master key inválida");
      }
    }

    if (role === "common") {
      if (currentUserRole !== "master") {
        throw new Error("Somente um master pode criar usuários");
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return user;
  }
}
