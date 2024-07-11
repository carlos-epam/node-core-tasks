import express from "express";
import cartRoutes from "./routes/cart.routes";
import productRoutes from "./routes/product.routes";
import { authMiddleware } from "./middlewares/auth.middleware";

const app = express();
const PORT = 8000;

app.use(express.json());

app.use("/api", authMiddleware);
app.use("/api/profile/cart", cartRoutes);
app.use("/api/products", productRoutes);


const server = app.listen(PORT, () => {
    console.log("Server running on port:", PORT);
})


process.on("SIGTERM", () => {
    console.log("SIGTERM received, closing server");

    server.close(() => {
        console.log("Server closed");
    })
})