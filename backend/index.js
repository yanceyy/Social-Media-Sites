const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require('./src/rounters/users');
const authRoute = require('./src/rounters/auth');
const postRoute = require('./src/rounters/posts');
dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("connect to mongo");
});


// middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/user", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/post", postRoute)


app.get("/", (req, res) => {
    res.send("welcome to homepage")
})

app.get("/users", (req, res) => {
    res.send("welcome to homepage")
})

app.listen(8800, () => {
    console.log("server is running");
});
