import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet"
import morgan from "morgan";
import dotenv from "dotenv";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import salesRoutes from "./routes/sales.js";
import managementRoutes from "./routes/management.js";

// Mock data and models imports
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";
import AffiliateStat from "./models/AffiliateStat.js";
import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} from "./data/index.js";

dotenv.config();
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



//MONGOOSE
const PORT = process.env.PORT || 8000;
mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`)); 
    
    
  //User.insertMany(dataUser);
  //Product.insertMany(dataProduct);
  //ProductStat.insertMany(dataProductStat);
  //Transaction.insertMany(dataTransaction);
  //AffiliateStat.insertMany(dataAffiliateStat);
  //OverallStat.insertMany(dataOverallStat);

}).catch((error) => console.log(`${error} did not connect`));