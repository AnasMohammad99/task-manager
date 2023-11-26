import express from "express";
import userRouter from "./routes/user-routes.js"
import taskRouter from "./routes/task-routes.js"
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import dotenv from "dotenv";
import JwtpassportConfig from './config/passport-config.js';
import LocalpassportConfig from "./config/passport-local-config.js"
import sessions from "express-session";



dotenv.config()
const app = express()
const PORT = process.env.PORT||5000;
const corsoptions = {credentials: true, origin:process.env.url||"*"}
app.use(cors(corsoptions))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());

//-------------passport-------------------
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: process.env.JWT_SECRET,
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));
JwtpassportConfig(passport)
LocalpassportConfig(passport)
app.use(passport.initialize());
app.use(passport.session());

app.get('/',(req,res)=>{
    res.send('hello')
})
app.use('/api/v1/user', userRouter);
app.use('/api/v1/task', taskRouter);

app.listen(PORT,()=>{
    console.log(`app listening on port ${PORT}`);
})
export default app

