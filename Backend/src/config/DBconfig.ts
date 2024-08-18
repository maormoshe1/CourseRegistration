import { DataSource } from "typeorm";
import dotenv from "dotenv"
dotenv.config()

export const connectDB = new DataSource({
  type: "postgres",
  host: `${process.env.PG_host}`,
  port: Number(process.env.PG_port),
  username: `${process.env.PG_username}`,
  password: process.env.PG_password,
  database: process.env.PG_database,
  logging: true,
  synchronize: false,
  entities: ["./dist/Entities/*.js"],
});
