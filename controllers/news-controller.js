import axios from "axios";
import dotenv from "dotenv";

dotenv.config()

const getNews = async (req,res)=>{
    try {
        var url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`;

        const news_get =await axios.get(url)
        res.status(200).json({...news_get.data.articles})
        
    } catch (error) {
        res.status(500).json({error:error.message})
        console.log(error.message);
    }
}

export {
    getNews
}