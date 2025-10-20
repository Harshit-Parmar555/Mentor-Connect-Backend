import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";
import logger from "./utils/logger";

dotenv.config();

const app = express();

// Middleware setup
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const morganFormat = ":method :url :status :response-time ms";
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

// Sample route
app.get("/health", (req, res) => {
  res.send("Server is healthy");
});

import authRouter from "./routes/auth.route";
import mentorRouter from "./routes/mentor.route";
import slotRouter from "./routes/slot.route";
import requestRouter from "./routes/request.route";

app.use("/api/auth", authRouter);
app.use("/api/mentors", mentorRouter);
app.use("/api/slots", slotRouter);
app.use("/api/requests", requestRouter);

export default app;
