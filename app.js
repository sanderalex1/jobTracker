import "dotenv/config";
import express from "express";
import applicationsRouter from "./routes/applications.js";

const app = express(); // creates the app
app.use(express.json());
app.use("/api/v1/applications", applicationsRouter);

export default app;
