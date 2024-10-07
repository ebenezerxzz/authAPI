import "reflect-metadata"
import 'dotenv/config'
import { DataSource } from "typeorm"
import { Registers } from '../app/models/User'

const host: string = String(process.env.HOST_DATABASE)
const port: number = Number(process.env.PORT_DATABASE)
const user: string = String(process.env.USER_DATABASE)
const password: string = String(process.env.PASS_DATABASE)
const database: string = String(process.env.DATABASE)

export const AppDataSource = new DataSource({
    type: "mysql",
    host: host,
    port: port,
    username: user,    
    password: password,
    database: database,
    entities: [
        Registers
    ],
    migrations: [
        "src/database/migrations/*.ts"
    ],
    driver: require('mysql2')
})
