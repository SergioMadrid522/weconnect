import http from "http";
import express from "express";
import cors from "cors";
import { port } from "./configuration.js";
import { chatServer } from "./chat.js";

import authRoutes from "./routes/auth.routes.js";
import userConfiguration from "./routes/user.routes.js";

const allowedOrigins = ["http://192.168.0.2:5173", "http://localhost:5173"];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET, POST, PATCH, DELETE, OPTIONS",
  optionsSuccessStatus: 200,
  credentials: true,
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.use("/auth/", authRoutes);
app.use("/userconfig/", userConfiguration);

const server = http.createServer(app);
chatServer(server);

server.listen(port, "0.0.0.0", () => {
  console.log(`Server running in http://localhost:${port}`);
});
