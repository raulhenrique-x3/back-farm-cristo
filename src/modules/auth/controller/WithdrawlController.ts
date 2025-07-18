import e, { Request, Response } from "express";
import { AppDataSource } from "../../../database/Data-source";
import { Withdrawal } from "../entities/Withdrawal";
import { User } from "../../user/entities/User";
import { Product } from "../../products/entities/Product";

class WithdrawalController {
  public async createWithdrawal(req: Request, res: Response): Promise<any> {
    const { userId, productId, quantity } = req.body;

    try {
      const userRepo = AppDataSource.getRepository(User);
      const productRepo = AppDataSource.getRepository(Product);
      const withdrawalRepo = AppDataSource.getRepository(Withdrawal);

      const user = await userRepo.findOneBy({ id: userId });
      const product = await productRepo.findOneBy({ id: productId });

      if (!user || !product) {
        return res.status(404).json({ message: "User or product not found" });
      }

      if (user.type !== "elderly") {
        return res
          .status(403)
          .json({ message: "Only elderly users can withdraw products" });
      }

      if (product.quantity < quantity) {
        return res.status(400).json({ message: "Insufficient product stock" });
      }

      if (quantity <= 0) {
        return res.status(400).json({ message: "Quantity must be greater than 0" });
      }

      // Atualiza estoque ANTES de salvar
      product.quantity -= quantity;
      await productRepo.save(product);

      const withdrawal = withdrawalRepo.create({
        user,
        product,
        quantity,
      });

      await withdrawalRepo.save(withdrawal);

      return res.status(201).json(withdrawal);
    } catch (error) {
      console.error("Erro ao registrar retirada:", error);
      return res.status(500).json({ message: "Erro ao registrar retirada" });
    }
  }

  public async getWithdrawalsHistory(
    req: Request,
    res: Response
  ): Promise<any> {
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
