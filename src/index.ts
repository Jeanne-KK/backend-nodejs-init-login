import express from "express";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use(errorHandler);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});