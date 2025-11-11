import express from "express";
import cors from "cors";
import route from "./routes/route.js";
import dotenv from 'dotenv';

dotenv.config;
const app = express();


const port = 3000 || process.env.PORT;

app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use("/api", route);

app.listen(port, () => {
  console.log("server is on port :", port); 
});
