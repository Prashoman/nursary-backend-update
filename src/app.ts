import express, { Application } from "express";
import cors from "cors";
import router from "./app/router/router";
import globalErrorHandler from "./app/middleware/globalErrorHandler";

const app: Application = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(globalErrorHandler);

export default app;
