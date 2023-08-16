//configure dotenv
require('dotenv').config()

const express = require("express");
const mongoose = require('mongoose');
const app = express();
const routes = require("./routes/employee.routes");
const cors = require('cors');
const dbUrl = process.env.DATABASE_URL;
const port = process.env.PORT;

//connect local db
//mongoose.connect("mongodb://localhost:27017/SOTI");

//connect mongo atlas
mongoose.connect(dbUrl)
    .then((e) => { console.log("Connected to Database....", e.connections[0].name); })
    .catch((err) => { console.error("Error connecting to database...", err); })

// parse requests of content-type - application/json
app.use(express.json());

//enable cors to send data to different servers
app.use(cors());

//Use routes file
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}......`);
});
