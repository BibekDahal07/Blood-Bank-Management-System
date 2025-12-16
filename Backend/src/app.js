import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import testRoutes from "./routes/test.routes.js";
import donorRoutes from "./routes/donor.routes.js";
import inventoryRoutes from "./routes/inventory.routes.js";
import requestRoutes from "./routes/request.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/donor", donorRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/requests", requestRoutes);

app.get("/", (req, res) =>{
    res.send("Blood Bank is running");
});

export default app;