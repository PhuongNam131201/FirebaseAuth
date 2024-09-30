const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    employeeId:{
        type:String,
        required:true,
        unique:true,
    },
    employeeName:{
        type:String,
        required:true
    },
    designation:{
       type:String,
       required:true 
    },
    dateOfBirth:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
employeeSchema.pre('save', function(next) {
    this.createdAt = Date.now();
    next();
});
const Employee = mongoose.model("Employee",employeeSchema);

module.exports = Employee;