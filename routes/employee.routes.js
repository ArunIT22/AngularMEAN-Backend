const express = require("express");
const router = express.Router();
//Import the Model created
const model = require('../models/employee.model');


/*
We use res for sending responses to our client, like Postman, or any front-end client. 
We use req for receiving requests from a client app like Postman, or any front-end client.
*/
//let's create route for the actions
//Get All
//router.route('/getAll').get((req,res)=>{})
router.get('/getAll', async (req, res) => {
    //res.json({ message: "Get All API" })
    // try {
    //     const empData = await model.find();
    //     res.json(empData);
    // } catch (error) {
    //     res.status(500).json({ message: error.message });
    //     res.status(500).send({ message: err.message || "Some error occurred while creating Employee." });
    // }
    await model.find().then(data => { res.send(data); }).catch(err => {
        res.status(500).send({ message: err.message || "Some error occurred while create Employee." });
    })
})

//Get By Id
router.get('/getById/:id', async (req, res) => {
    // res.send(req.params.id);
    // try {
    //     const empData = await model.findById(req.params.id);
    //     res.send(empData);
    // } catch (error) {
    //     res.status(500).json({ message: error.message });
    // }

    await model.findById(req.params.id).then(data => { res.send(data); }).catch(err => {
        res.status(500).send({ message: err.message || "Some error occurred while create Employee." });
    })
});

//Post Method
router.post('/post', async (req, res) => {
    // res.send('POST API');

    //simple method
    //model.create(req.body)

    //Validate the request
    if (!req.body.name || !req.body.mobileNo) {
        res.status(400).send({ message: "Name or Mobile No cannot be blank" })
    }

    //Creating Employee Data
    const empData = new model({
        name: req.body.name,
        email: req.body.email,
        city: req.body.city,
        mobileNo: req.body.mobileNo
    })
    // try {
    //     const empPostData = await empData.save();//insert a new row
    //     res.status(201).json(empPostData);
    // }
    // catch (error) {
    //     res.status(500).json({ message: error.message });
    // }
    await empData.save(empData).then(data => { res.send(data) }).catch(err => {
        res.status(500).send({ message: err.message || "Some error occurred while create Employee." })
    })
});

//Update Method
router.put('/update/:id', async (req, res) => {
    //res.send('Update API');
    // try {
    //     const id = req.params.id;
    //     const empUpdateData = req.body;
    //     //whether to return the update value or not
    //     const options = { new: true };
    //     const result = await model.findByIdAndUpdate(id, empUpdateData, options);
    //     res.send(result);
    // }
    // catch (error) {
    //     res.status(500).json({ message: error.message });
    // }

    await model.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(data => {
            if (!data) {
                res.status(400).send({ message: "No data found" })
            }
            else
                res.status(204).send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while create Employee." });
        });
});

//Delete method
router.delete('/delete/:id', async (req, res) => {
    // try {
    //     const id = req.params.id;
    //     //whether to return the update value or not
    //     const options = { new: true };
    //     const empDeleteData = await model.findByIdAndDelete(id, options);
    //     res.send(empDeleteData);
    // }
    // catch (error) {
    //     res.status(500).json({ message: error.message });
    // }
    const options = { new: true };
    await model.findByIdAndDelete(req.params.id, options)
        .then(data => {
            if (!data) {
                res.status(400).send({ message: "No data found" })
            }
            else
                res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while create Employee." });
        });
})

//export the route to use in other files
module.exports = router;