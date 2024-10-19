import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet"
import morgan from "morgan";

const app = express();
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}))
app.use(morgan("common"))
app.use(cors())

// ROUTES
app.use("/client", clientRoutes)
app.use("/general", generalRoutes)
app.use("/management", managementRoutes)
app.use("/sales", salesRoutes)