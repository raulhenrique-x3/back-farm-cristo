import { AppDataSource } from "../../../database/Data-source";
import { Pharmaceutical } from "../entities/Pharmaceutical";

export class UserRepository {
  private userRepo = AppDataSource.getRepository(Pharmaceutical);

  async findByEmail(email: string) {
    const user = await this.userRepo.findOneBy({ email });
    return user;
  }

  async create() {
    const userRepo = AppDataSource.getRepository(Pharmaceutical);
    return userRepo;
  }
}
