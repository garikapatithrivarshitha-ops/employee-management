const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// CORS FIX
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE"
}));

app.use(express.json());

// Debug logs
console.log("MONGO_URI =", process.env.MONGO_URI);
console.log("PORT =", process.env.PORT);

// Test route
app.get("/", (req, res) => {
    res.send("Employee Management API is running...");
});

// Employee routes
const employeeRoutes = require("./routes/employees");
app.use("/api/employees", employeeRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
