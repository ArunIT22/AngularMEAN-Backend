const mongoose = require('mongoose');

//Define collection and Schema of Employee Table
const empSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    city: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    mobileNo: {
        required: true,
        type: String
    }
},
    {
        collection: 'Employee'
    }
);

module.exports = mongoose.model('EmployeeModel', empSchema);