import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import logger from "../ToDoEndpoints/src/utilis/logger.js";
import todoRouter from "./src/routes/todoRouter.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// routes
app.get ('/health',(req, res) => {
    res.status(200).send('I am very healthy')
});

app.use('/api',todoRouter);

app.listen(port, () => {
    logger.info (`server is running on port ${port}`);
});
