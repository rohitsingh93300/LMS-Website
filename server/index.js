import express, {urlencoded} from 'express'
import dotenv from "dotenv"
import cookieParser from 'cookie-parser';
import cors from 'cors'
import connectDB from './database/db.js';
import userRoute from './routes/user.route.js'
import courseRoute from './routes/course.route.js'
import mediaRoute from "./routes/media.route.js";
import path from 'path';

dotenv.config()
//Database connection here..
connectDB();
const app = express();
const PORT = process.env.PORT || 3000;


const _dirname = path.resolve();

// default middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin: "https://lms-website-wdnh.onrender.com",
    credentials:true
}))

//apis
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute)
app.use("/api/v1/course", courseRoute)

app.use(express.static(path.join(_dirname, "/my-project/dist")))

app.get('*', (_, res)=> {
    res.sendFile(path.resolve(_dirname, "my-project", "dist", "index.html"))
})

app.listen(PORT, ()=> {
    console.log(`Server listen at port ${PORT}`)
})
