const express = require("express");
const BodyParser = require("body-parser");
const https = require("https");
const dotenv = require("dotenv");
dotenv.config()



const app = express();
app.use(express.static("public"))
app.use(BodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs")
const key = process.env.API;


app.get("/", (req, res)=>{
    const url = "https://www.alphavantage.co/query?function=CRYPTO_RATING&symbol=BTC&apikey="+key
    https.get(url, (response)=>{
        // console.log(response.statusCode)
        response.on("data", (data)=>{
        const result = JSON.parse(data);
        let title = result["Crypto Rating (FCAS)"];
        let name = title["2. name"]
        let symbol = title["1. symbol"]
        let fcas = title["3. fcas rating"]
        let Market = title["6. market maturity score"]
        let Dev = title["5. developer score"]
        let Facscore = title["4. fcas score"]
        let Utility = title["7. utility score"]
        console.log(result)
        // console.log(result)
        res.render("Home", {title : name, Symbol : symbol, FCAS : fcas,
             Market : Market, Dev : Dev, Facscore : Facscore,
             Utility : Utility
            })
        
    })
}) 
})
app.listen(3000, (req, res)=>{
    console.log("app running on Port 3000")
})