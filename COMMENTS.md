GrupoA Educação - Full Stack Web Developer
===================

[![N|Solid](https://www.grupoa.com.br/hs-fs/hubfs/logo-grupoa.png?width=300&name=logo-grupoa.png)](https://www.grupoa.com.br) 

Este projeto contém os arquivos necessários para configuração e inicialização do **Backend** e **Frontend** utilizando **Docker Container**. Os diretórios `back` e `front` possuem os arquivos `Dockerfile` e `docker-compose.yml`. Na raiz o arquivo `.travis.yml` é responsável pelas configurações de **CI/CD** (Integração e Entrega Contínua), recurso utilizado para subir as versões em ambientes sem a necessidade de interferir manualmente para gerar os artefatos necessários para levantar os serviços em ambiente de produção.

# Decisão da arquitetura utilizada
![Listagem de Alunos](/imgs/arquitetura.png)

O projeto foi estruturado para rodar em ambiente de produção utilizando Docker/Swarm com proxy `Traefik` recebendo as requisições de diversos clientes e encaminhando para os serviços de destino adequado. O Frontend (https://localhost:5000) por sua vez a cada requisição coleta os dados no Backend (http://localhost:3000) utilizando o `axios`. Ao acessar o host do Backend direto no navegador o usuário é direcionado para a visualização da documentação utilizando o Swagger. O Banco de dados utilizado no ambiente de produção é o MySQL. Durante os testes do Backend o Banco dados utilizado é o SQLite.

A cada commit no ambiente de produção (Branch Master) o Travis (CI/CD) executa os pipelines:
- test //Executas os testes definidos no Backend
- build BackEnd //Faz o build do projeto Backend e armazena no docker registry
- deploy BackEnd //Cria uma stack do projeto Backend (Stack, Services e Containers)
- build FrontEnd //Faz o build do projeto Frontend e armazena no docker registry
- deploy FrontEnd //Cria uma stack do projeto Frontend (Stack, Services e Containers)

## Como instalar
1. Configure o banco MySQL;
2. Crie uma conta gratuita em `https://travis-ci.com/`;
3. Importe o projeto do github;
4. Nas configurações do projeto no Travis, crie as variáveis de ambiente:

** Branch: master **
- PROJECT_NAME=DesafioGrupoA
- API_HOST=http://localhost:3000
- APP_NAME=desafio-back
- NODE_ENV=production
- BASE_PATH=<PATH_DE_SUA_PREFERENCIA>
- DB_DATA=grupoa
- DB_DIALECT=mysql
- DB_HOST=<HOST_DO_MYSQL>
- DB_USER=root
- DB_PASS=<SENHA_DO_MYSQL>
- DOCKER_PASSWORD=<DOCKER_REGISTRY_LOGIN>
- DOCKER_USERNAME=<DOCKER_REGISTRY_PASS>
- NODE_ENV=tests
- REGISTRY_URL=
- SECRET=<HASH_DE_QUALQUER_COISA>
- TZ=America/Bahia

5. Execute pela primeira vez o pipeline, as tabelas serão criadas e a aplicação estará disponível na web!
6. No seu MySQL, exceute o script abaixo (altere o hash da senha para um de sua preferecia utilizando MD5):

```
NSERT INTO users (name, email, 'pass', created_at, updated_at) 
    VALUES('Administrator', 'admin@admin.com', 'e10adc3949ba59abbe56e057f20f883e', '2020-11-30 11:20:00.000', '2020-11-30 11:20:00.000');
```
7. Acesse o Frontend e faça login (Não precisa converter a senha em MD5)

### Como instalar localmente
#### Backend

1. Configure o banco MySQL;
2. Entre no diretório back `cd ./back`;
3. Criar o arquivo `.env` com base no arquivo `.env-example`;
4. Instale as dependencias `npm install`;
5. Rode a aplicação com `npm run start`. O serviço responde em `http://localhost:3000/`
6. No seu MySQL, exceute o script abaixo:

```
NSERT INTO users (name, email, pass, created_at, updated_at) 
    VALUES('Administrator', 'admin@admin.com', 'e10adc3949ba59abbe56e057f20f883e', '2020-11-30 11:20:00.000', '2020-11-30 11:20:00.000');
```

#### Executar Testes
1. Entre no diretório back `cd ./back`;
2. Instale as dependencias `npm install`;
3. Rode os testes com `npm run test`

#### Frontend
1. Entre no diretório back `cd ./front`;
2. Criar o arquivo `.env` com base no arquivo `.env-example`;
4. Instale as dependencias `npm install`;
5. Rode a aplicação com `npm run serve`. O serviço responde em `http://localhost:8080/`

# Lista de bibliotecas de terceiros utilizadas

## Backend
- express
- express-swagger-generator
- express-validator
- jsonwebtoken
- moment
- mysql2
- sequelize
- sequelize-auto-migrations
- sequelize-querystring
- sqlite3
- validatorjs

## Frontend
- js-md5
- vue-axios
- vue-loading-overlay
- vue-pluralize
- vue-router
- vuelidate
- vuetify
- vuex
- vuex-persist

# O que você melhoraria se tivesse mais tempo
- Mudança de arquitetura de CI/CD para para Amazon EKS
- Feature para troca de senhas;
- Feature para auto cadastro na tela de login.

# Quais requisitos obrigatórios que não foram entregues
Todos os requisitos obrigatórios foram devidamente implementados.