import { Request, Response } from "express";
import { AppDataSource } from "../../../database/Data-source";
import { Person } from "../entities/Person";
import { Product } from "../entities/Product";

class PersonController {
  public async createPerson(req: Request, res: Response): Promise<any> {
    const {
      name,
      birthDate,
      weight,
      motherName,
      cpf,
      type,
      medicines = [],
      products = [],
    } = req.body;

    try {
      const personRepo = AppDataSource.getRepository(Person);
      const productRepo = AppDataSource.getRepository(Product);

      if (type !== "Elderly" && type !== "Donor") {
        return res
          .status(400)
          .json({ message: "Tipo inválido. Use 'Elderly' ou 'Donor'" });
      }

      const person = personRepo.create({
        name,
        birthDate,
        weight,
        motherName,
        cpf,
        type,
      });

      if (type === "Elderly" && medicines.length > 0) {
        const received: Product[] = [];

        for (const item of medicines) {
          if (!item.name || !item.quantity) {
            return res
              .status(400)
              .json({
                message: "Nome e quantidade são obrigatórios em cada remédio.",
              });
          }

          const newMedicine = productRepo.create({
            name: item.name,
            quantity: item.quantity,
            category: "Medicine",
          });

          await productRepo.save(newMedicine);
          received.push(newMedicine);
        }

        person.receivedProducts = received;
      }

      if (type === "Donor" && products.length > 0) {
        const donated: Product[] = [];

        for (const item of products) {
          if (!item.name || !item.quantity || !item.category) {
            return res
              .status(400)
              .json({
                message:
                  "Nome, quantidade e categoria são obrigatórios em cada produto doado.",
              });
          }

          const newItem = productRepo.create({
            name: item.name,
            quantity: item.quantity,
            category: item.category,
          });

          await productRepo.save(newItem);
          donated.push(newItem);
        }

        person.donatedProducts = donated;
      }

      await personRepo.save(person);
      return res.status(201).json(person);
    } catch (error) {
      console.error("Erro ao criar person:", error);
      return res.status(500).json({ message: "Erro ao criar person" });
    }
  }

  public async getAllPersons(_: Request, res: Response): Promise<any> {
    try {
      const repo = AppDataSource.getRepository(Person);
      const people = await repo.find({
        relations: ["receivedProducts", "donatedProducts"],
      });

      return res.status(200).json(people);
    } catch (error) {
      console.error("Erro ao buscar persons:", error);
      return res.status(500).json({ message: "Erro ao buscar persons" });
    }
  }

  public async getPersonById(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    try {
      const repo = AppDataSource.getRepository(Person);
      const person = await repo.findOne({
        where: { id: Number(id) },
        relations: ["receivedProducts", "donatedProducts"],
      });

      if (!person) {
        return res.status(404).json({ message: "Person not found" });
      }

      return res.status(200).json(person);
    } catch (error) {
      console.error("Erro ao buscar person:", error);
      return res.status(500).json({ message: "Erro ao buscar person" });
    }
  }

  public async updatePerson(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const { name, birthDate, weight, motherName, cpf, type } = req.body;

    try {
      const repo = AppDataSource.getRepository(Person);
      const person = await repo.findOneBy({ id: Number(id) });

      if (!person) {
        return res.status(404).json({ message: "Person not found" });
      }

      Object.assign(person, {
        name,
        birthDate,
        weight,
        motherName,
        cpf,
        type,
      });

      await repo.save(person);
      return res.status(200).json(person);
    } catch (error) {
      console.error("Erro ao atualizar person:", error);
      return res.status(500).json({ message: "Erro ao atualizar person" });
    }
  }

  public async deletePerson(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    try {
      const repo = AppDataSource.getRepository(Person);
      const person = await repo.findOneBy({ id: Number(id) });

      if (!person) {
        return res.status(404).json({ message: "Person not found" });
      }

      await repo.remove(person);
      return res.status(204).send();
    } catch (error) {
      console.error("Erro ao deletar person:", error);
      return res.status(500).json({ message: "Erro ao deletar person" });
    }
  }

  public async addMedicinesToPerson(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const medicines = req.body;

    try {
      const personRepo = AppDataSource.getRepository(Person);
      const productRepo = AppDataSource.getRepository(Product);

      const person = await personRepo.findOne({
        where: { id: Number(id) },
        relations: ["receivedProducts"],
      });

      if (!person) {
        return res.status(404).json({ message: "Person not found" });
      }

      if (person.type !== "Elderly") {
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

      person.receivedProducts.push(...newMedicines);
      await personRepo.save(person);

      return res.status(200).json(person);
    } catch (error) {
      console.error("Erro ao adicionar medicamentos:", error);
      return res
        .status(500)
        .json({ message: "Erro ao adicionar medicamentos" });
    }
  }

  public async addProductsToPerson(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const products = req.body;

    try {
      const personRepo = AppDataSource.getRepository(Person);
      const productRepo = AppDataSource.getRepository(Product);

      const person = await personRepo.findOne({
        where: { id: Number(id) },
        relations: ["donatedProducts"],
      });

      if (!person) {
        return res.status(404).json({ message: "Person not found" });
      }

      if (person.type !== "Donor") {
        return res
          .status(400)
          .json({ message: "Only Donor can donate products" });
      }

      const newProducts: Product[] = [];

      for (const item of products) {
        if (!item.name || !item.quantity || !item.category) {
          return res.status(400).json({
            message: "name, quantity and category are required",
          });
        }

        if (item.category !== "Product" && item.category !== "Medicine") {
          return res
            .status(400)
            .json({ message: "category must be Product or Medicine" });
        }

        const newProd = productRepo.create({
          name: item.name,
          quantity: item.quantity,
          category: item.category,
        });

        await productRepo.save(newProd);
        newProducts.push(newProd);
      }

      person.donatedProducts.push(...newProducts);
      await personRepo.save(person);

      return res.status(200).json(person);
    } catch (error) {
      console.error("Erro ao adicionar produtos:", error);
      return res.status(500).json({ message: "Erro ao adicionar produtos" });
    }
  }

  public async associateExistingMedicinesToElderly(
    req: Request,
    res: Response
  ): Promise<any> {
    const { id } = req.params;
    const { productIds } = req.body;

    try {
      const personRepo = AppDataSource.getRepository(Person);
      const productRepo = AppDataSource.getRepository(Product);

      const person = await personRepo.findOne({
        where: { id: Number(id) },
        relations: ["receivedProducts"],
      });

      if (!person) {
        return res.status(404).json({ message: "Person not found" });
      }

      if (person.type !== "Elderly") {
        return res
          .status(400)
          .json({ message: "Only elderly can receive medicines" });
      }

      const products = await productRepo.findByIds(productIds);

      // Valida se todos os produtos são do tipo "Medicine"
      const invalid = products.find((p) => p.category !== "Medicine");
      if (invalid) {
        return res
          .status(400)
          .json({ message: `Product ${invalid.id} is not a medicine` });
      }

      // Associa sem duplicar
      const existingIds = person.receivedProducts.map((p) => p.id);
      const newProducts = products.filter((p) => !existingIds.includes(p.id));

      person.receivedProducts.push(...newProducts);
      await personRepo.save(person);

      return res.status(200).json(person);
    } catch (error) {
      console.error("Erro ao associar medicamentos:", error);
      return res.status(500).json({ message: "Erro ao associar medicamentos" });
    }
  }

  public async associateExistingProductsToDonor(
    req: Request,
    res: Response
  ): Promise<any> {
    const { id } = req.params;
    const { productIds } = req.body;

    try {
      const personRepo = AppDataSource.getRepository(Person);
      const productRepo = AppDataSource.getRepository(Product);

      const person = await personRepo.findOne({
        where: { id: Number(id) },
        relations: ["donatedProducts"],
      });

      if (!person) {
        return res.status(404).json({ message: "Person not found" });
      }

      if (person.type !== "Donor") {
        return res
          .status(400)
          .json({ message: "Only donors can donate products" });
      }

      const products = await productRepo.findByIds(productIds);

      if (products.length === 0) {
        return res.status(400).json({ message: "No valid products found" });
      }

      // Verifica se todos os produtos têm categoria válida
      const invalid = products.find(
        (p) => p.category !== "Product" && p.category !== "Medicine"
      );
      if (invalid) {
        return res.status(400).json({
          message: `Product with id ${invalid.id} has invalid category (${invalid.category})`,
        });
      }

      // Evita duplicações
      const existingIds = person.donatedProducts.map((p) => p.id);
      const newProducts = products.filter((p) => !existingIds.includes(p.id));

      person.donatedProducts.push(...newProducts);
      await personRepo.save(person);

      return res.status(200).json(person);
    } catch (error) {
      console.error("Erro ao associar produtos:", error);
      return res.status(500).json({ message: "Erro ao associar produtos" });
    }
  }
}

export default new PersonController();
