const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const employeemodel = mongoose.model('Employee', EmployeeSchema);
module.exports=employeemodel
