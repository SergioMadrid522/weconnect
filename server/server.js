import express from "express";
import { port } from "./configuration.js";
import authRoutes from "./routes/auth.routes.js";
import userConfiguration from "./routes/user.routes.js";
const app = express();
app.use(express.json());

app.use("/auth/", authRoutes);
app.use("/userconfig/", userConfiguration);

app.listen(port, () => {
  console.log(`Server running in http://localhost:${port}`);
});
