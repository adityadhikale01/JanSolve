import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import userRoutes from "./features/user/userRoutes.js";
import reportRoutes from "./features/ReportProblem/report.routes.js";
import adminReportRoutes from "./features/admin/adminReport.routes.js";
import masterProblemRoutes from "./features/MasterProblem/masterProblem.routes.js";
import aiRoutes from "./features/AI/ai.routes.js";


const app = express();

//Cors is used to allow cross origin resource sharing means we can send request from one origin to another
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

//If credential is not true then cookie will not be sent to the client and the client will not be able to send cookie to the server.
app.use(cookieParser());

//Middlewares used to parse the request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Morgan is used to log the requests
app.use(morgan("dev"));



app.use("/users", userRoutes);
app.use("/api/reports", reportRoutes);

app.use(
  "/api/admin/reports",
  adminReportRoutes
);
app.use(
  "/api/admin/master-problems",
  masterProblemRoutes
);
app.use(
  "/api/admin/ai",
  aiRoutes
);
app.use(
  (err, req, res, next) => {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
    });
  }
);

mongoose.connect(
  process.env.MONGO_URI
);

app.listen(3000, () => {
  console.log(
    "Server Running on port 3000"
  );
});
