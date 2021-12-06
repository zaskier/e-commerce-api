# e-commerce-api

e-commerce service with users and products. It is developed with Typescript, NestJS, PostgreSQL, typeORM it is using Docker.
Documentation for API is created with Swagger.

- Tests are done with Jest and Superstest.
- Authorisation is done by passwords stored in api DB and authentication is done with JWT.
- On users endpoint can be performed CRUD operations
- Users can add review curently anonymous in the future they will be able by ahthorisation and with saced relation to product and user
- Products are done in test form and for now they are only stored in application memory.

## Step to be done before deployment

- add ".env" file in main directory and configure it

```
POSTGRES_HOST={}
POSTGRES_PORT={}
POSTGRES_USER={}
POSTGRES_PASSWORD={}
POSTGRES_DATABASE={}
SECRET=  //for main.ts
JWT_SECRET= {} // for JWT token
```

## to Build Docker image:

```
- docker pull nestjs/cli
- docker run nestjs/cli
- docker pull postgres
- docker run --name postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres
- docker-compose up {dev/prod}
```

## to run dev/prod enviorment

```
 - npm run start:{dev/prod}
```

## to run unit tests

```
 - npm run test:watch
```

## to run integration tests

```
 - npm run test:e2e:watch
```
