import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Sequelize } from 'sequelize';
import { Item } from "./Interfaces/item.interface";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT;
const database = process.env.DATABASE as string;
const username = process.env.USERNAME as string;
const password = process.env.PASSWORD as string;
const server = process.env.SERVER as string;

const sequelize = new Sequelize(database, username, password, {
host: server,
dialect: "postgres",
dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    },
    dialectModule: require('pg'),
});

TryConnection();

const items: Item[] = [];

app.get('/', (req, res) => {
    res.send('Hello world!');
  });

app.listen(8080, () => {
  console.log("Express server started on port 3000");
});

async function TryConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}