import express from "express";
import cors from "cors";

const app = express();

// Basic configuration
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));   
app.use(express.static("public"));

// "CORS configuration "
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type"],
  }),
);
// Import the routes 
import healthCheckRouter from "./routes/healthcheck.routes.js";

app.use("/api/v1/healthcheck",healthCheckRouter);

app.get("/", (req, res) => {
res.send("Welcome to the project camp");
});
export default app;
