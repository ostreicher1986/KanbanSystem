# Kanban System

Sistema de gestão de cards ou simplesmente kaban. O sistema é constituído por duas parte, um banckend ( Api Rest - WebApi C# net7.0) e um frontend ( Reatc + typescript). Por se tratar de um projeto mais didático, não estamos utilizando um banco de dados relacional para armazenar as nossas informações, para tal propósito, optamos pela utilização de um banco em memória, o que conseguimos através do Microsoft EntityFrameworkCore InMemory.

## 🚀 Começando

Para baixar o projeto basta realizar o clone do mesmo. Para facilicar, segue a linha de comando que pode ser executada em seu terminal de preferência: 

```
git clone https://github.com/ostreicher1986/KanbanSystem.git
```

### 📋 Pré-requisitos

A seguir lista de ferramentas/frameworks que foram utilizadas na construção do sistema

* node v18.16.0
* npm 9.5.1
* yarn 1.22.19
* dotnet 7.0.402
* react 16.14.0
* typescript 3.7.2
* Visual Studio Code Versão: 1.85.2
* Microsoft Visual Studio Community 2022 (64 bits) - Current Versão 17.7.5
* Postman for Windows Version 10.22.0 Architecture x64
* Docker Desktop 4.26.1 (131620)

### 🔧 Instalação

A seguir as etapas necessárias para executar o projeto em sua máquina:

### Clonar o projeto 

Consulte **[Começando](#-começando)** para saber como clonar o projeto.

#### Executar sem container docker 

Após o projeto encontrar-se em sua máquina..., 

1) Vamos configurar a nossa API.

Encontre o arquivo:

```
appsettings.example.json
```

Vamos renomear o mesmo para:

```
appsettings.json
```

Dentro dele teremos algo assim:

```
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "Jwt": {
    "Key": "",
    "Issuer": "",
    "Audience": "",
    "ExpireMin": 0
  },
  "Credentials": {
    "Username": "",
    "Password": ""
  }
}
```

Precisamos preencher os valores do token (Jwt) e as credenciais de acesso (Credentials). Segue um exemplo:

### Token de acesso:

* Key: Chave utilizada para gerar o token. Ex: $#447650776k0jhkfl00j0l0d01050405090808040.
* Issuer: Emissor do token. Ex: KanbanSystem.
* Audience: Destinatário do token. Ex: KanbanSystem.
* ExpireMin: Tempo de duração do token em minutos. Ex: 30.

### Credenciais de acesso:

* Username: Usuário que pode acessar o sistema. Ex: admin.
* Password: Senha do usuário que pode acessar o sistema. Ex: 123.

Com isso nosso arquivo deverá ficar assim:

```
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "Jwt": {
    "Key": "$#447650776k0jhkfl00j0l0d01050405090808040jhkjh2489579275982",
    "Issuer": "KanbanSystem",
    "Audience": "KanbanSystem",
    "ExpireMin": 30
  },
  "Credentials": {
    "Username": "admin",
    "Password": "123"
  }
}
```

Vale ressaltar que até aqui demos um exemplo de configuração do arquivo, cabe a você configurá-lo de acordo com a sua necessidade.

Por padrão, a API está setada para ser executada na porta 5000. Para acessar a API, utilize o endereço:

```
http://localhost:5000
```

Assim que a API estiver em funcionamento, o swagger será exibido:

<img src="https://github.com/ostreicher1986/KanbanSystem/blob/main/IMG/KanbanSystem_swagger.png">

Com a API em funcionamento...

2) Vamos configurar o nosso Frontend.

Encontre o arquivo:

```
.env.example
```

Vamos renomear o mesmo para:

```
.env
```

Dentro dele teremos algo assim:

```
SERVER_PORT=
API_TIMEOUT=
REACT_APP_CALL_GROWL_LIFE=
REACT_APP_BASE_URL_API=
```

Precisamos preencher os valores das variáveis, para o frontend poder ser executado. Segue um exemplo:

* SERVER_PORT: Porta onde a aplicação será executada. Ex: 80.
* API_TIMEOUT: Tempo que será considerado ao fazermos uma chamada à API. Ex: 20000.
* REACT_APP_CALL_GROWL_LIFE: Tempo de vida que cada mensagem terá de exibição na aplicação. Ex: 4000.
* REACT_APP_BASE_URL_API: Url base da API. Ex: http://localhost:5000.

Com isso nosso arquivo deverá ficar assim:

```
SERVER_PORT=80
API_TIMEOUT=20000
REACT_APP_CALL_GROWL_LIFE=4000
REACT_APP_BASE_URL_API=http://localhost:5000
```

Vale ressaltar que até aqui demos um exemplo de configuração do arquivo, cabe a você configurá-lo de acordo com a sua necessidade.

Agora temos que baixar as dependências do frontend.

Com seu terminal de preferência, naveque até onde encontra-se a raiz do seu projeto (Frontend) e digete os seguintes comandos:

```
yarn add --dev react-app-rewired
yarn install --production
```

Após ter baixado as dependências do frontend, agora vamos executar a aplicação. Para isso digite no mesmo terminal o comando:

```
yarn dev
```

Por padrão, o Frontend está setada para ser executada na porta 3001. Para acessar o Frontend, utilize o endereço:

```
http://localhost:3001/
```

Assim que o Frontend estiver em funcionamento, o sistema será exibido:

<img src="https://github.com/ostreicher1986/KanbanSystem/blob/main/IMG/KanbanSystem_login.png">

Depois de devidamente autenticado, você terá acesso ao board kanban...

<img src="https://github.com/ostreicher1986/KanbanSystem/blob/main/IMG/KanbanSystem_board.png">

#### Executar com container docker

Para a execução utilizando container, vamos utilizar dois arquivos "Dockerfiles", um para cada projeto, ou seja, teremos um arquivo dentro da raiz do projeto BACK e um arquivo dentro do projeto FRONT.

Dockerfile - Back:

<img src="https://github.com/ostreicher1986/KanbanSystem/blob/main/IMG/KanbanSystem_dockerfile_back.png">

Segue conteúdo do arquivo:

#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

```
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Defina as variáveis de ambiente
ENV Jwt__Key="$#447650776k0jhkfl00j0l0d01050405090808040jhkjh2489579275982"
ENV Jwt__Issuer="KanbanSystem"
ENV Jwt__Audience="KanbanSystem"
ENV Jwt__ExpireMin=30
ENV Credentials__Username="admin"
ENV Credentials__Password="123"

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["KanbanSystem.csproj", "."]
RUN dotnet restore "./KanbanSystem.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "KanbanSystem.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "KanbanSystem.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "KanbanSystem.dll"]
```

**Fique atento a definição das variáveis de ambientes, pois eles serão utilizadas pela API dentro do container.**


Dockerfile - Front:

<img src="https://github.com/ostreicher1986/KanbanSystem/blob/main/IMG/KanbanSystem_dockerfile_front.png">

Segue conteúdo do arquivo:

```
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
```

**Fique atento a definição das variáveis de ambientes, pois eles serão utilizadas pelo FRONT dentro do container.**

E vamos utilizar um arquivo chamado "docker-compose", para fazer o gerenciamento dos módulos perante docker.

<img src="https://github.com/ostreicher1986/KanbanSystem/blob/main/IMG/KanbanSystem_dockercompose.png">

Segue conteúdo do arquivo:

```
version: '3'
services:
  backend:
    image: kanban_system_board_back
    build:
      context: ./BACK
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    environment:
      - ASPNETCORE_URLS=http://[::]:5000
    networks:
      - kanban_network
  frontend:
    image: kanban_system_board_front
    build:
      context: ./FRONT
      dockerfile: Dockerfile
    ports:
      - "3001:3001"
    environment:
      - REACT_APP_PORT=3001
    depends_on:
      - backend
    networks:
      - kanban_network
networks:
  kanban_network:
    driver: bridge
```

Temos aqui uma hierarquia dentro dos comandos do arquivo onde temos:

**services: backend e frontend.** 

Dentro das configurações temos as definições dos nomes das imagens, **image: kanban_system_board_back** para o back e **image: kanban_system_board_front** para o front. 
Temos o **build** que define basicamente qual arquivo dockerfile deve executar. 
Também vemos as definições das portas que serão mapeadas entre máquina e container, onde temos que **ports:- "5000:5000"** faz o mapeamento do back e **ports:- "3001:3001"** faz o mapeamento do front.

Por garantia, criamos uma rede chamada **kanban_network**, que é utilizada tanto pelo back, como pelo front, do tipo **bridge**.

Vamos criar os nossos containers...

No terminal de sua preferência, navegue até onde encontra-se o arquivo docker-compose dentro da nossa estrutura e digite o comando:

```
docker-compose up --build -d
```

<img src="https://github.com/ostreicher1986/KanbanSystem/blob/main/IMG/KanbanSystem_dockercompose_build1.png">

<img src="https://github.com/ostreicher1986/KanbanSystem/blob/main/IMG/KanbanSystem_dockercompose_build2.png">

No docker desktop, os containers do back e front, estão em execução...

<img src="https://github.com/ostreicher1986/KanbanSystem/blob/main/IMG/KanbanSystem_dockerdesktop_container.png">

Para acessar a nossa aplicação, utilize o endereço: http://localhost:3001/


## ⚙️ Executando os testes

### 1) Teste API

A seguir, temos os cURLs dos endpoints que estão disponíveis pela API.

### Autenticação da API

Segue curl que pode ser importado para dentro da ferramenta Postman.

```
curl --location 'http://0.0.0.0:5000/login' \
--header 'Content-Type: application/json' \
--data-raw '{
  "login": "admin",
  "password": "123"
}'
```

Segue exemplo de retorno da autenticação, quando a mesma for realizada com sucesso:

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDU3NjY5MTEsImlzcyI6IkthbmJhblN5c3RlbSIsImF1ZCI6IkthbmJhblN5c3RlbSJ9.eCzmpSsGvwK0uOtwRfaRptmw8aGiprqABJRg8f-9KGo",
    "success": true,
    "message": "Bem-vindo ao Kanban System"
}
```

### Salvar um card

Segue curl que pode ser importado para dentro da ferramenta Postman.

```
curl --location 'http://0.0.0.0:5000/cards' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDU3NjY5MTEsImlzcyI6IkthbmJhblN5c3RlbSIsImF1ZCI6IkthbmJhblN5c3RlbSJ9.eCzmpSsGvwK0uOtwRfaRptmw8aGiprqABJRg8f-9KGo' \
--data '{  
  "title": "Mapeamento da entidade Cliente",
  "content": "Criar a entidade dentro da API e realizar mapeamento das suas propriedades, com os campos da tabela do banco de dados equivalente.",
  "list": "ToDo"
}'
```

Segue exemplo de retorno do endpoint salvar, quando o mesmo for realizado com sucesso:

```
{
    "result": {
        "id": "999c0ea8-d603-419e-90b7-b6dc26bf4fa5",
        "title": "Mapeamento da entidade Cliente",
        "content": "Criar a entidade dentro da API e realizar mapeamento das suas propriedades, com os campos da tabela do banco de dados equivalente.",
        "list": "ToDo"
    },
    "success": true,
    "message": "Card Mapeamento da entidade Cliente salvo com sucesso."
}
```

### Carrega lista de cards

Segue curl que pode ser importado para dentro da ferramenta Postman.

```
curl --location 'http://0.0.0.0:5000/cards' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDU3Njc3NjAsImlzcyI6IkthbmJhblN5c3RlbSIsImF1ZCI6IkthbmJhblN5c3RlbSJ9.1viHbjqtx2hWpqr7XXK7hVTPxrxzbqCMKY2vWtfQvMQ'
```

Segue exemplo de retorno do endpoint listar cards, quando o mesmo for realizado com sucesso:

```
{
    "result": [
        {
            "id": "999c0ea8-d603-419e-90b7-b6dc26bf4fa5",
            "title": "Mapeamento da entidade Cliente",
            "content": "Criar a entidade dentro da API e realizar mapeamento das suas propriedades, com os campos da tabela do banco de dados equivalente.",
            "list": "ToDo"
        }
    ],
    "success": true,
    "message": "Lista de cards carregadas com sucesso."
}
```

### Alterar um card

Segue curl que pode ser importado para dentro da ferramenta Postman.

```
curl --location --request PUT 'http://0.0.0.0:5000/cards/999c0ea8-d603-419e-90b7-b6dc26bf4fa5' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDU3Njc3NjAsImlzcyI6IkthbmJhblN5c3RlbSIsImF1ZCI6IkthbmJhblN5c3RlbSJ9.1viHbjqtx2hWpqr7XXK7hVTPxrxzbqCMKY2vWtfQvMQ' \
--data '{  
  "title": "Mapeamento da entidade Cliente",
  "content": "Card de teste",
  "list": "ToDo"
}'
```

Segue exemplo de retorno do endpoint alterar, quando o mesmo for realizado com sucesso:

```
{
    "result": {
        "id": "999c0ea8-d603-419e-90b7-b6dc26bf4fa5",
        "title": "Mapeamento da entidade Cliente",
        "content": "Card de teste",
        "list": "ToDo"
    },
    "success": true,
    "message": "Card Mapeamento da entidade Cliente atualizado com sucesso."
}
```

### Remover um card

Segue curl que pode ser importado para dentro da ferramenta Postman.

```
curl --location --request DELETE 'http://0.0.0.0:5000/cards/999c0ea8-d603-419e-90b7-b6dc26bf4fa5' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDU3Njc3NjAsImlzcyI6IkthbmJhblN5c3RlbSIsImF1ZCI6IkthbmJhblN5c3RlbSJ9.1viHbjqtx2hWpqr7XXK7hVTPxrxzbqCMKY2vWtfQvMQ'
```

Segue exemplo de retorno do endpoint remover, quando o mesmo for realizado com sucesso:

```
{
    "result": [],
    "success": true,
    "message": "Card Mapeamento da entidade Cliente removido com sucesso."
}
```

### 2) Teste Aplicação

A seguir, temos as funcionalidades do kanban em execução.

### Adiconando um card

A primeira coluna da esquerda para a direita é onde o usuário conseguirá criar um novo card, que por definição já é criado e colocado na coluna "To Do".

<img src="https://github.com/ostreicher1986/KanbanSystem/blob/main/IMG/KanbanSystem_new_card.png">

Por definição de projeto, os botões "Salvar" e "Remover", só ficam disponíveis quando temos os campos "Título" e "Conteúdo", preenchidos. Assim garantimos uma determinada integridade, bem como uma coerência no funcionamento do componente.

<img src="https://github.com/ostreicher1986/KanbanSystem/blob/main/IMG/KanbanSystem_to_do.png">

### Alterando um card

No canto superior direito do card, temos um botão "Lápis"... quando pressionado o modo de edição do card é habilitado.

<img src="https://github.com/ostreicher1986/KanbanSystem/blob/main/IMG/KanbanSystem_edit_card1.png">

<img src="https://github.com/ostreicher1986/KanbanSystem/blob/main/IMG/KanbanSystem_edit_card2.png">

### Movendo um card

Abaixo do card temos três botões, dos quais dois são referêntes a novimentação do card entre as listas do kaban. O botão "<<", move o card para trás, enquanto o botão ">>", move o card para frente, fazendo assim o card ser posicionado na coluna que mais faz sentido para o usuário.

<img src="https://github.com/ostreicher1986/KanbanSystem/blob/main/IMG/KanbanSystem_move_card1.png">

<img src="https://github.com/ostreicher1986/KanbanSystem/blob/main/IMG/KanbanSystem_move_card2.png">

### Remover um card

Abaixo do card temos três botões, dos quais um deles é referênte a remoção do card do kaban. O botão em questão é representado pela figura da "lixeira".

<img src="https://github.com/ostreicher1986/KanbanSystem/blob/main/IMG/KanbanSystem_delete_card1.png">

<img src="https://github.com/ostreicher1986/KanbanSystem/blob/main/IMG/KanbanSystem_delete_card2.png">

### Sair do Kanban System

No lado superior esquerdo, temos um ícone que representa o próprio quadro Kanban, sendo que logo abaixo dele temo o nome do sistema.

<img src="https://github.com/ostreicher1986/KanbanSystem/blob/main/IMG/KanbanSystem_exit1.png">

Ao clicar em cima no nome "Kanban System", a funcionalidade de logout será disponibilizada.

<img src="https://github.com/ostreicher1986/KanbanSystem/blob/main/IMG/KanbanSystem_exit2.png">

Pressionou o botão "Sair", o usuário é direcionado para a tela de login novamente.

## ✒️ Autores

A seguir meus contatos:

* **Perfil [linkedin](https://www.linkedin.com/in/pedro-anderson-6773614b/)**
* **Perfil [github](https://github.com/ostreicher1986)**

## 📄 Licença

Este projeto está sob a licença (MIT License) - veja o arquivo [LICENSE.md](https://github.com/ostreicher1986/KanbanSystem/blob/main/LICENSE) para detalhes.

## 📌 Conclusão

* Por se tratar de um projeto didático, alguns pontos não foram considerados, tais como: segurança, armazenamento dos dados em banco relacional, entre outras complexidades.

* Cabe a quem for baixar esse projeto, dar continuidade e implementar o que julga estar faltando.

* Aqui é um bom exemplo de como pensar, codificar, testar e implantar um pequeno sistema.

* Estou às ordens para quaisquer dúvidas, sugestões ou críticas.

* Bons estudos!!!