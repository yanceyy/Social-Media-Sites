const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require('./src/rounters/users');
const authRoute = require('./src/rounters/auth');
const postRoute = require('./src/rounters/posts');
const cors = require('cors');
dotenv.config();

const app = express();

app.use(cors());

// Connect to mongodb service
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


app.listen(process.env.PORT || 8800, () => {
    console.log("server is running");
});
