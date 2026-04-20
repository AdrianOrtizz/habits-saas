import dotenv from "dotenv";
dotenv.config();

import { app } from "./app";
import { connectDB } from "./config/db";
import { env } from "./config/env";

const startServer = async () => {
  await connectDB();

  app.listen(Number(env.PORT), "0.0.0.0", () => {
    console.log(`🚀 Server running on port ${env.PORT}`);
  });
};

startServer();
