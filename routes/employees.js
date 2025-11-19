const express = require("express");
const Employee = require("../models/Employee");
const router = express.Router();

// Create Employee
router.post("/", async (req, res) => {
    try {
        const employee = await Employee.create(req.body);
        res.json(employee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get All Employees
router.get("/", async (req, res) => {
    const employees = await Employee.find();
    res.json(employees);
});

// Update Employee
router.put("/:id", async (req, res) => {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(employee);
});

// Delete Employee
router.delete("/:id", async (req, res) => {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted" });
});

module.exports = router;
