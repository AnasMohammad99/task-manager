import axios from "axios";
import dotenv from "dotenv";

dotenv.config()


const getWeather = async (req,res)=>{
    try {
        var url = `http://api.weatherapi.com/v1/forecast.json?key=e88d73a9ce16400aae4121514231410&q=Cairo&days=3&aqi=no&alerts=no`;
        const waether_get =await axios.get(url)
        // console.log(waether_get.data);
        res.status(200).json(waether_get.data)
        
    } catch (error) {
        res.status(500).json({error:error.message})
        console.log(error);
    }
}

export {
    getWeather
}