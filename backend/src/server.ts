import 'reflect-metadata';  
import 'dotenv/config';
import { AppDataSource } from "./database/data-source";
import { Registers } from "./app/models/User";

import router from "../router/routes/router";
import express from 'express';

const host: string = String(process.env.HOST_SERVER);
const port: number = Number(process.env.PORT_SERVER);

AppDataSource.initialize().then(async () => {
    const server = express();

    console.log("Connected at database with sucessful !");

    server.use(express.json());
    server.use(router);

    server.listen(port, () => {
        console.log(`Server is running in http://${host}:${port}`)
    });

}).catch(error => console.log(error))
