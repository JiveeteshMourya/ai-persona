import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { errorHandler } from "./src/middlewares/errorMiddlewares.js";
import wrapAsync from "./src/common/utils/wrapAsync.js";
import { chatController } from "./src/controllers/chatControllers.js";

dotenv.config({ path: "./.env" });
const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = process.env.CORS_ORIGIN?.split(",") || [];
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like curl or Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.warn("❌ Blocked by CORS:", origin);
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.post("/api/v1/chat", wrapAsync(chatController));
app.get("/api/v1/health", (req, res) => res.send("ok"));

app.use(errorHandler);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`\n Server is running on port => ${port}`);
});
