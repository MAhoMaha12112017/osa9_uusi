import express from "express";
import cors from "cors";
import diagnosesRouter from "./routes/diagnosesRouters";
import patientsRouter from "./routes/patientsRoutes";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/diagnosis", diagnosesRouter);
app.use("/api/patients", patientsRouter);

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
