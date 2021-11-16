# e-commerce-api
e-commerce service with users and products. It is developed with NestJS, PostgreSQL, Typescript.
Users can add review curently anonymous in the future they will be able to add them woth relations
Users can be created.

## Step to be done before deployment
- add ".env" file in main directory and configure it

```
POSTGRES_HOST={}
POSTGRES_PORT={}
POSTGRES_USER={}
POSTGRES_PASSWORD={}
POSTGRES_DATABASE={}
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

