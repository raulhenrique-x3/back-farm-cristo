import { Request, Response } from "express";
import {AppDataSource} from "../../../database/Data-source";
import { Idoso } from "../entities/Idoso";

class IdosoController {
  public async create(req: Request, res: Response): Promise<any> {
    const { nome, data_nascimento, peso, nome_mae, cpf } = req.body;

    try {
      const idosoRepository = AppDataSource.getRepository(Idoso);
      const idoso = idosoRepository.create({
        nome,
        data_nascimento,
        peso,
        nome_mae,
        cpf
      });

      await idosoRepository.save(idoso);

      return res.status(201).json(idoso);
    } catch (error) {
      console.error("Erro ao criar idoso:", error);
      return res.status(500).json({ message: "Erro ao criar idoso" });
    }
  }

    public async getAll(req: Request, res: Response): Promise<any> {
        try {
        const idosoRepository = AppDataSource.getRepository(Idoso);
        const idosos = await idosoRepository.find();
    
        return res.status(200).json(idosos);
        } catch (error) {
        console.error("Erro ao buscar idosos:", error);
        return res.status(500).json({ message: "Erro ao buscar idosos" });
        }
    }

    public async getById(req: Request, res: Response): Promise<any> {
        const { id } = req.params;

        try {
            const idosoRepository = AppDataSource.getRepository(Idoso);
            const idoso = await idosoRepository.findOneBy({ id: Number(id) });

            if (!idoso) {
                return res.status(404).json({ message: "Idoso não encontrado" });
            }

            return res.status(200).json(idoso);
        } catch (error) {
            console.error("Erro ao buscar idoso:", error);
            return res.status(500).json({ message: "Erro ao buscar idoso" });
        }
    }

    public async update(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const { nome, data_nascimento, peso, nome_mae, cpf } = req.body;

        try {
            const idosoRepository = AppDataSource.getRepository(Idoso);
            const idoso = await idosoRepository.findOneBy({ id: Number(id) });

            if (!idoso) {
                return res.status(404).json({ message: "Idoso não encontrado" });
            }

            idoso.nome = nome;
            idoso.data_nascimento = data_nascimento;
            idoso.peso = peso;
            idoso.nome_mae = nome_mae;
            idoso.cpf = cpf;

            await idosoRepository.save(idoso);

            return res.status(200).json(idoso);
        } catch (error) {
            console.error("Erro ao atualizar idoso:", error);
            return res.status(500).json({ message: "Erro ao atualizar idoso" });
        }
    }

    public async delete(req: Request, res: Response): Promise<any> {
        const { id } = req.params;

        try {
            const idosoRepository = AppDataSource.getRepository(Idoso);
            const idoso = await idosoRepository.findOneBy({ id: Number(id) });

            if (!idoso) {
                return res.status(404).json({ message: "Idoso não encontrado" });
            }

            await idosoRepository.remove(idoso);

            return res.status(204).send();
        } catch (error) {
            console.error("Erro ao deletar idoso:", error);
            return res.status(500).json({ message: "Erro ao deletar idoso" });
        }
    }
}

    

export default new IdosoController();