import express from "express";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middlewares/errorHandler";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors({
    origin: "*",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use(errorHandler);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});