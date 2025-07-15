import { app } from "./app";
import { AppDataSource } from "./database/Data-source";
AppDataSource.initialize()
  .then(() => {
    console.log("Banco conectado com sucesso!");
    app.listen(3000, () => {
      console.log("Servidor rodando na porta 3000 🚀");
    });
  })
  .catch((error) => console.log("Erro ao conectar no banco:", error));




app.listen(8000, () => {
  console.log("Server running at http://localhost:8000");
});
