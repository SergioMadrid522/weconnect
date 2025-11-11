import http from "http";
import express from "express";
import cors from "cors";
import { PORT } from "./configuration.js";
import { chatServer } from "./chat.js";

import authRoutes from "./routes/auth.routes.js";
import userConfiguration from "./routes/user.routes.js";

const allowedOrigins = [
  "https://weconnectchat.netlify.app", 
  "http://localhost:5173",
  "htpp://localhost:4000",
];

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
server.listen(PORT, "0.0.0.0", () => {
  //console.log(`Server running`);
});
