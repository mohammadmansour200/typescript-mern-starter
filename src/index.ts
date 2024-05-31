import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import connectDB from "./config/db";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import path from "path";

//Route files
//Your route files here

//Load env vars
dotenv.config({ path: "./src/config/.env" });

//Connect to DB
connectDB();

const app = express();

//Body parser
app.use(express.json());

//Cookie parser
app.use(cookieParser());

//Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Sanitize data
app.use(mongoSanitize());

//Set security headers
app.use(helmet());

//Prevent XSS attacks
app.use(xss());

//Rate limiting
app.use(
  rateLimit({
    windowMs: 10 * 60 * 1000, //10 minutes
    limit: 70,
  })
);

//Prevent http param pollution
app.use(hpp());

//Mount routes
//Mount your routes here i.e app.use("/api/auth", authRoutes);

// Set static folder
app.use(express.static(path.join(__dirname, "../public")));

const PORT = process.env.PORT;

app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
