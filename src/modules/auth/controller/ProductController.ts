import { Request, Response } from 'express';
import { AppDataSource } from "../../../database/Data-source";
import { Product } from '../entities/Product';
import { IProduct } from '../dtos/ProductDto';

class ProductController {
  
  public async createProduct(req: Request, res: Response): Promise<any> {
    const { name, quantity, category } = req.body;

    try {
      const productRepository = AppDataSource.getRepository(Product);
      const product = productRepository.create({
        name,
        quantity,
        category,
      });

      await productRepository.save(product);

      return res.status(201).json(product);
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      return res.status(500).json({ message: "Erro ao criar produto" });
    }
  }

  public async getAllProducts(req: Request, res: Response): Promise<any> {
    try {
      const productRepository = AppDataSource.getRepository(Product);
      const products = await productRepository.find();

      return res.status(200).json(products);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      return res.status(500).json({ message: "Erro ao buscar produtos" });
    }
  }

  public async getProductById(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    try {
      const productRepository = AppDataSource.getRepository(Product);
      const product = await productRepository.findOneBy({ id: Number(id) });

      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }

      return res.status(200).json(product);
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
      return res.status(500).json({ message: "Erro ao buscar produto" });
    }
  }

  public async updateProduct(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const { name, quantity, category } = req.body;

    try {
      const productRepository = AppDataSource.getRepository(Product);
      const product = await productRepository.findOneBy({ id: Number(id) });

      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }

      product.name = name;
      product.quantity = quantity;
      product.category = category;

      await productRepository.save(product);

      return res.status(200).json(product);
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      return res.status(500).json({ message: "Erro ao atualizar produto" });
    }
  }

  public async deleteProduct(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    try {
      const productRepository = AppDataSource.getRepository(Product);
      const product = await productRepository.findOneBy({ id: Number(id) });

      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }

      await productRepository.remove(product);

      return res.status(204).send();
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      return res.status(500).json({ message: "Erro ao deletar produto" });
    }
  }

  public async registerManyProducts(req: Request, res: Response): Promise<any> {
    const products: IProduct[] = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Lista de produtos inválida." });
    }

    try {
      const productRepository = AppDataSource.getRepository(Product);
      const savedProducts = await productRepository.save(products);
      return res.status(201).json(savedProducts);
    } catch (error) {
      console.error("Erro ao cadastrar produtos em massa:", error);
      return res.status(500).json({ message: "Erro ao cadastrar produtos" });
    }
  }

  public async updateManyProducts(req: Request, res: Response): Promise<any> {
    const products: IProduct[] = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Lista de produtos inválida." });
    }

    try {
      const productRepository = AppDataSource.getRepository(Product);

      for (const product of products) {
        await productRepository.update(product.id, {
          name: product.name,
          quantity: product.quantity,
          category: product.category,
        });
      }

      return res.status(200).json({ message: "Produtos atualizados com sucesso." });
    } catch (error) {
      console.error("Erro ao atualizar produtos:", error);
      return res.status(500).json({ message: "Erro ao atualizar produtos" });
    }
  }

   



}

export default new ProductController();
