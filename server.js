import express from "express";
import weatherRouter from "./routes/weather-routes.js";
import currencyRouter from "./routes/cryptocurrency-routes.js";
import newsRouter from "./routes/news-routes.js";
import bankRouter from "./routes/bank-routes.js"
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";


dotenv.config()
const app = express()
const PORT = process.env.PORT||5000;
const corsoptions = {credentials: true, origin:process.env.url||"*"}
app.use(cors(corsoptions))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());
app.get('/',(req,res)=>{
    res.send('hello')
})

app.use('/api/v1/weather', weatherRouter);
app.use('/api/v1/crypto', currencyRouter);
app.use('/api/v1/news', newsRouter);
app.use('/api/v1/bank', bankRouter);

app.listen(PORT,()=>{
    console.log(`app listening on port ${PORT}`);
})

