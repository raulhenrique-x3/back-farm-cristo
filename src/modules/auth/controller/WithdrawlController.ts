import { Request, Response } from "express";
import { AppDataSource } from "../../../database/Data-source";
import { Withdrawal } from "../entities/Withdrawal";
import { Person } from "../../auth/entities/Person";
import { Product } from "../../auth/entities/Product";

class WithdrawalController {
  public async createWithdrawal(req: Request, res: Response): Promise<any> {
    const { personId, productId, quantity } = req.body;

    try {
      const personRepo = AppDataSource.getRepository(Person);
      const productRepo = AppDataSource.getRepository(Product);
      const withdrawalRepo = AppDataSource.getRepository(Withdrawal);

      const person = await personRepo.findOneBy({ id: personId });
      const product = await productRepo.findOneBy({ id: productId });

      if (!person || !product) {
        return res.status(404).json({ message: "Person or product not found" });
      }

      if (person.type !== "Elderly") {
        return res.status(403).json({ message: "Only elderly can withdraw products" });
      }

      if (product.quantity < quantity) {
        return res.status(400).json({ message: "Insufficient product stock" });
      }

      const withdrawal = withdrawalRepo.create({
        person,
        product,
        quantity
      });

      await withdrawalRepo.save(withdrawal);

      // Atualiza estoque do produto
      product.quantity -= quantity;
      await productRepo.save(product);

      return res.status(201).json(withdrawal);
    } catch (error) {
      console.error("Erro ao registrar retirada:", error);
      return res.status(500).json({ message: "Erro ao registrar retirada" });
    }
  }

  public async getWithdrawalsHistory(req: Request, res: Response): Promise<any> {
    try {
      const withdrawalRepo = AppDataSource.getRepository(Withdrawal);
      const withdrawals = await withdrawalRepo.find({
        order: { withdrawnAt: "DESC" },
      });

      return res.status(200).json(withdrawals);
    } catch (error) {
      console.error("Erro ao buscar retiradas:", error);
      return res.status(500).json({ message: "Erro ao buscar retiradas" });
    }
  }
}

export default new WithdrawalController();
