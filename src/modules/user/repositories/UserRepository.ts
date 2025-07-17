import { AppDataSource } from "../../../database/Data-source";
import { Pharmaceutical } from "../../auth/entities/Pharmaceutical";

export class UserRepository {
  private userRepo = AppDataSource.getRepository(Pharmaceutical);

  async findByEmail(email: string) {
    const user = await this.userRepo.findOneBy({ email });
    return user;
  }

  async createUser(data: Partial<Pharmaceutical>) {
    const newUser = this.userRepo.create(data);
    return await this.userRepo.save(newUser);
  }
}
