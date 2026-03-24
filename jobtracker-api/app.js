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

app.use((err, req, res, next) => {
  if (err) {
    switch (err.code) {
      case "ECONNREFUSED":
        console.log(err);
        return res.status(500).json({ error: "DB error!" });
      default:
        console.log(err);
        return res.status(500).json({ error: "Internal server error!" });
    }
  }
});

export default app;
