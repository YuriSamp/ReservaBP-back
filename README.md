# backend-challenge Reserva BP

## Como rodar o projeto

1. **Instalar as dependências**:

`pnpm i`

2. **Rodar a aplicação localmente**:

`pnpm dev`

3. **rodar a aplicação no container Docker**

`docker-compose up`

4. **MongoDB URL**

Uma boa opção aqui é criar uma conta em:

https://www.mongodb.com/

e no próprio passo a passo do sistema é possível criar um banco e pegar uma URL
utilizando a interface do Mongo Atlas

Alternativamente, caso não esteja usando o compose, você pode subir um container do mongo rodando esse comando

`docker run -d -p 27017:27017  --name mongodb mongo:latest`

E colar essa url no seu .env

`mongodb://localhost:27017`

5. **Testes**

Para executa-los: `pnpm test`
coverage: `pnpm test:coverage`

6. **Documentação dos Endpoints**

FALTA FAZER

7. **Vídeo**

FALTA FAZER

## Requisitos

[✅] Deverá ser criado um CRUD de cadastro de usuários.

[✅] Deverá utilizar um banco de dados a sua preferencia;

[ ] Deverá ser criado um sistema de agendamento entre Clientes e Corretores de Seguro

[✅] A Aplicação deverá ser Dockerizada

[✅] Implemente Validação de dados na API

[✅] Implemente Hash e Sanitização de dados sensíveis no backend

[ ] Documente a API com Swagger

[ ] Testes Unitários e/ou E2E

[✅] Desafio deverá ser feito em Typescript

[✅] Faça uma Documentação no README da aplicação

[✅] Coloque seu código no Github


## Observações
