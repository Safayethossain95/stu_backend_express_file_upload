import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import router from "./routes/api.js";
import fileUpload from 'express-fileupload';
import { DATABASE, MAX_JSON_SIZE, PORT, REQUEST_NUMBER, REQUEST_TIME, URL_ENCODE, WEB_CACHE } from "./app/config/config.js";

const app = express();

app.use(cors());
app.use(express.json({limit: MAX_JSON_SIZE}))
app.use(express.urlencoded({extended: URL_ENCODE}))
app.use(helmet());
app.use(cookieParser());
app.use(express.static('public'));
app.use(fileUpload());

const limiter = rateLimit({windowMs: REQUEST_TIME, max: REQUEST_NUMBER});
app.use(limiter)

app.set("etag", WEB_CACHE)

mongoose.connect(DATABASE, { autoIndex: true }).then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.log("MongoDB disconnect",err);
})

app.use('/api', router)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
