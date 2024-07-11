import express from "express";

const app = express();
const PORT = 8000;

app.use(express.json());

app.get("/", (req,res) => res.send("sup"));


const server = app.listen(PORT, () => {
    console.log("Server running on port:", PORT);
})


process.on("SIGTERM", () => {
    console.log("SIGTERM received, closing server");

    server.close(() => {
        console.log("Server closed");
    })
})