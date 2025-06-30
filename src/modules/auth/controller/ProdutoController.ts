import {Request, Response} from 'express';
import {AppDataSource} from '../../../database/Data-source';
import {Produto} from '../entities/Produto';

class ProdutoController {
    public async create(req: Request, res: Response): Promise<any> {
        const { nome, quantidade, necessidade, categoria } = req.body;

        try {
            const produtoRepository = AppDataSource.getRepository(Produto);
            const produto = produtoRepository.create({
                nome,
                quantidade,
                necessidade,
                categoria
            });

            await produtoRepository.save(produto);

            return res.status(201).json(produto);
        } catch (error) {
            console.error("Erro ao criar produto:", error);
            return res.status(500).json({ message: "Erro ao criar produto" });
        }
    }

    public async getAll(req: Request, res: Response): Promise<any> {
        try {
            const produtoRepository = AppDataSource.getRepository(Produto);
            const produtos = await produtoRepository.find();

            return res.status(200).json(produtos);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
            return res.status(500).json({ message: "Erro ao buscar produtos" });
        }
    }

    public async getById(req: Request, res: Response): Promise<any> {
        const { id } = req.params;

        try {
            const produtoRepository = AppDataSource.getRepository(Produto);
            const produto = await produtoRepository.findOneBy({ id: Number(id) });

            if (!produto) {
                return res.status(404).json({ message: "Produto não encontrado" });
            }

            return res.status(200).json(produto);
        } catch (error) {
            console.error("Erro ao buscar produto:", error);
            return res.status(500).json({ message: "Erro ao buscar produto" });
        }
    }

    public async update(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const { nome, quantidade, necessidade, categoria } = req.body;

        try {
            const produtoRepository = AppDataSource.getRepository(Produto);
            let produto = await produtoRepository.findOneBy({ id: Number(id) });

            if (!produto) {
                return res.status(404).json({ message: "Produto não encontrado" });
            }

            produto.nome = nome;
            produto.quantidade = quantidade;
            produto.necessidade = necessidade;
            produto.categoria = categoria;

            await produtoRepository.save(produto);

            return res.status(200).json(produto);
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            return res.status(500).json({ message: "Erro ao atualizar produto" });
        }
    }

    public async delete(req: Request, res: Response): Promise<any> {
        const { id } = req.params;

        try {
            const produtoRepository = AppDataSource.getRepository(Produto);
            const produto = await produtoRepository.findOneBy({ id: Number(id) });

            if (!produto) {
                return res.status(404).json({ message: "Produto não encontrado" });
            }

            await produtoRepository.remove(produto);

            return res.status(204).send();
        } catch (error) {
            console.error("Erro ao deletar produto:", error);
            return res.status(500).json({ message: "Erro ao deletar produto" });
        }
    }
}

export default ProdutoController;