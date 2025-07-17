import { Request, Response } from "express";
import { AppDataSource } from "../../../database/Data-source";
import { User } from "../entities/User";
import { Product } from "../../auth/entities/Product";

class UserController {
  public async createUser(req: Request, res: Response): Promise<any> {
    const { name, birthDate, cpf, type } = req.body;

    try {
      const userRepo = AppDataSource.getRepository(User);

      const user = userRepo.create({
        name,
        birthDate,
        cpf,
        type,
      });

      await userRepo.save(user);
      return res.status(201).json(user);
    } catch (error) {
      console.error("Erro ao criar user:", error);
      return res.status(500).json({ message: "Erro ao criar user" });
    }
  }

  public async getAllUsers(_: Request, res: Response): Promise<any> {
    try {
      const repo = AppDataSource.getRepository(User);
      const users = await repo.find({
        relations: ["receivedProducts", "donatedProducts"],
      });

      return res.status(200).json(users);
    } catch (error) {
      console.error("Erro ao buscar users:", error);
      return res.status(500).json({ message: "Erro ao buscar users" });
    }
  }

  public async getUserById(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    try {
      const repo = AppDataSource.getRepository(User);
      const user = await repo.findOne({
        where: { id: Number(id) },
        relations: ["receivedProducts", "donatedProducts"],
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.error("Erro ao buscar user:", error);
      return res.status(500).json({ message: "Erro ao buscar user" });
    }
  }

  public async updateUser(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const { name, birthDate, weight, motherName, cpf, type } = req.body;

    try {
      const repo = AppDataSource.getRepository(User);
      const user = await repo.findOneBy({ id: Number(id) });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      Object.assign(user, {
        name,
        birthDate,
        cpf,
        type,
      });

      await repo.save(user);
      return res.status(200).json(user);
    } catch (error) {
      console.error("Erro ao atualizar user:", error);
      return res.status(500).json({ message: "Erro ao atualizar user" });
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    try {
      const repo = AppDataSource.getRepository(User);
      const user = await repo.findOneBy({ id: Number(id) });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await repo.remove(user);
      return res.status(204).send();
    } catch (error) {
      console.error("Erro ao deletar user:", error);
      return res.status(500).json({ message: "Erro ao deletar user" });
    }
  }

  public async addMedicinesToUser(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const medicines = req.body;

    try {
      const userRepo = AppDataSource.getRepository(User);
      const productRepo = AppDataSource.getRepository(Product);

      const user = await userRepo.findOne({
        where: { id: Number(id) },
        relations: ["receivedProducts"],
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.type !== "elderly") {
        return res
          .status(400)
          .json({ message: "Only Elderly can receive medicines" });
      }

      const newMedicines: Product[] = [];

      for (const item of medicines) {
        if (!item.name || !item.quantity) {
          return res
            .status(400)
            .json({ message: "name and quantity are required" });
        }

        const newMed = productRepo.create({
          name: item.name,
          quantity: item.quantity,
          category: "Medicine",
        });

        await productRepo.save(newMed);
        newMedicines.push(newMed);
      }

      user.receivedProducts.push(...newMedicines);
      await userRepo.save(user);

      return res.status(200).json(user);
    } catch (error) {
      console.error("Erro ao adicionar medicamentos:", error);
      return res
        .status(500)
        .json({ message: "Erro ao adicionar medicamentos" });
    }
  }
}

export default new UserController();
