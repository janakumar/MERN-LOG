const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 3000;
const employeemodel = require('./model/Employee');

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/employee")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("Error connecting to MongoDB", err));


//login
app.post('/sign-in',(req,res)=>{
    const {email,password}=req.body;
    const user= employeemodel.findOne({email})
    .then((user)=>{
        if(user){
            if(user.password===password){
                res.json("success")
            }else{
                res.json("password invalid")
            }
        }
        else{
            res.json("no user exists")
        } 

    })
})
// POST endpoint to add an employee
app.post('/sign-up', async (req, res) => {
    const { name, email, password } = req.body;

    // Validate input fields
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields (name, email, password) are required' });
    }

    try {
        // Check if the email is already registered
        const existingUser = await employeemodel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }

        // Save the new user directly (insecure for production)
        const newEmployee = new employeemodel({ name, email, password });
        await newEmployee.save();

        res.status(201).json({ message: "Employee created successfully", user: { name, email } });
    } catch (err) {
        console.error("Error saving employee:", err);
        res.status(500).json({ error: "Server error, could not save employee" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});
