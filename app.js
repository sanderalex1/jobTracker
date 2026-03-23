import "dotenv/config";
import express from "express";
import applicationsRouter from "./routes/applications.js";
import cors from "cors";

const app = express(); // creates the app

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());
app.use("/api/v1/applications", applicationsRouter);

export default app;
