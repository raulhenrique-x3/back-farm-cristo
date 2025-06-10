FROM node:18-alpine
# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência primeiro
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos
COPY . .

# Expõe a porta do servidor
EXPOSE 8000

# Comando para rodar o servidor em dev com hot reload
CMD ["npm", "run", "dev"]
