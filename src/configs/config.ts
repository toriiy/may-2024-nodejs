import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongoUri:
    process.env.MONGO_DB_URI || "mongodb://localhost:27017/express-mongo",
};