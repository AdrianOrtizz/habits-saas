import express from "express";
import cors from "cors";

import router from "./routes/index";
import { errorMiddleware } from "./middlewares/error.middleware";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", router);
app.use(errorMiddleware);

app.get("/ping", (req, res) => {
  res.status(200).send("ok");
});
