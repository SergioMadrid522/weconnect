import express from "express";
import cors from "cors";
import { port } from "./configuration.js";
import authRoutes from "./routes/auth.routes.js";
import userConfiguration from "./routes/user.routes.js";

const corsOptions = {
  origin: "http://127.0.0.1:5500",
  optionsSuccessStatus: 200,
};
const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.use("/auth/", authRoutes);
app.use("/userconfig/", userConfiguration);

app.listen(port, () => {
  console.log(`Server running in http://localhost:${port}`);
});
