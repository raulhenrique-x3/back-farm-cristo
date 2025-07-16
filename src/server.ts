import { app } from "./app";
import { AppDataSource } from "./database/Data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("Banco conectado com sucesso!");
    app.listen(8000, () => {
      console.log("Servidor rodando na porta 8000 🚀");
    });
  })
  .catch((error) => console.log("Erro ao conectar no banco:", error));
