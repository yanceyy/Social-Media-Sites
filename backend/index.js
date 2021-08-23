const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const multer = require('multer');
const userRoute = require('./src/rounters/users');
const authRoute = require('./src/rounters/auth');
const postRoute = require('./src/rounters/posts');
const path = require('path');
const {v4: uuidv4} = require('uuid');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());
app.use("/images", express.static(path.join(__dirname, "public/images")))
// Connect to mongodb service
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("connect to mongo");
});
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images")
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + '.' + file.originalname.split('.').pop())
    }
})
const upload = multer({storage});
app.post('/api/upload', upload.single("file"), (req, res) => {
    try {
        return res.status(200).json({filePath: req.file.filename})
    } catch (error) {
        console.log(error)
    }
})

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
