import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Application, Router } from "express";

// Environment variables
const { parsed } = dotenv.config();
const { NODE_APP_PORT } = parsed as any;

// Controllers
const routes: Router = require('./controllers');

const app: Application = express();

app.use(bodyParser.json());

app.use(cors());

app.use('/api/v1', routes);
