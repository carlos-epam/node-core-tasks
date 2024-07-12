import express from "express";
import cartRoutes from "./routes/cart.routes";
import productRoutes from "./routes/product.routes";
import { authMiddleware } from "./middlewares/auth.middleware";

import mongoose from "mongoose";

const connectToDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/online-shop");
        console.log("Connected to MongoDB instance");
    } catch (error) {
        console.error("Something went wrong connecting to MongoDB:", error);
        process.exit(1);
    }
}
const app = express();
const PORT = 8000;

app.use(express.json());

app.use("/api", authMiddleware);
app.use("/api/profile/cart", cartRoutes);
app.use("/api/products", productRoutes);





connectToDB().then(() => {
    const server = app.listen(PORT, () => {
        console.log("Server running on port:", PORT);
    });

    process.on("SIGTERM", () => {
        console.log("SIGTERM received, closing server");

        server.close(() => {
            console.log("Server closed");
        })
    });

})

