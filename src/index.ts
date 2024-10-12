import express, { NextFunction, Request, Response } from "express";
import { middlewareFunction } from "./middleware/middleware";
import mongoose, { ConnectOptions } from "mongoose";
import bodyParser from "body-parser"
import * as controller from "./controller/controller"
const app = express();
app.use(bodyParser.json());

app.use(function (req: Request, res: Response, next: NextFunction) {
  console.log("global middle");
  next()
});

app.post("/reg", controller.registerUser);
app.post("/login", controller.loginUser);
app.get("/", middlewareFunction, (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Node.js!");
});

mongoose
  .connect("mongodb+srv://admin:admin@cluster0.hwuu13w.mongodb.net/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.listen(8080, () => {
  console.log("server is running 3000");
});
