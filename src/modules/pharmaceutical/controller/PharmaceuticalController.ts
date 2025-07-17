import { Request, Response } from "express";
import { AppDataSource } from "../../../database/Data-source";
import { Pharmaceutical } from "../entities/Pharmaceutical";

class PharmaceuticalController {
  public async getAllPharmaceuticals(_: Request, res: Response): Promise<any> {
    try {
      const repo = AppDataSource.getRepository(Pharmaceutical);
      const pharmaceuticals = await repo.find();

      return res.status(200).json(pharmaceuticals);
    } catch (error) {
      console.error("Erro ao buscar produtos farmacêuticos:", error);
      return res
        .status(500)
        .json({ message: "Erro ao buscar produtos farmacêuticos" });
    }
  }

  public async getPharmaceuticalById(
    req: Request,
    res: Response
  ): Promise<any> {
    const { id } = req.params;

    try {
      const repo = AppDataSource.getRepository(Pharmaceutical);
      const pharmaceutical = await repo.findOneBy({ id: Number(id) });

      if (!pharmaceutical) {
        return res
          .status(404)
          .json({ message: "Produto farmacêutico não encontrado" });
      }

      return res.status(200).json(pharmaceutical);
    } catch (error) {
      console.error("Erro ao buscar produto farmacêutico:", error);
      return res
        .status(500)
        .json({ message: "Erro ao buscar produto farmacêutico" });
    }
  }
}

export default new PharmaceuticalController();
