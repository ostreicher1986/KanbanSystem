# Configurar a versão de trabalho do node
FROM node:18.16.0

# Configurar o diretório de trabalho
WORKDIR /app
EXPOSE 80

# Defina as variáveis de ambiente
ENV REACT_APP_CALL_GROWL_LIFE=5000
ENV REACT_APP_BASE_URL_API=http://localhost:5000
ENV PORT=3001

COPY package.json yarn.lock ./

RUN yarn add --dev react-app-rewired

# Instala as dependências da aplicação
RUN yarn install --production

# Copiar os arquivos do frontend para o contêiner
COPY . .

# Comando para iniciar a aplicação
CMD ["yarn", "dev"]