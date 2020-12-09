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
    const url1 = "https://www.alphavantage.co/query?function=CRYPTO_RATING&symbol=ETH&apikey="+key
    https.get(url, (response)=>{
        // console.log(response.statusCode)
        response.on("data", (data)=>{
        const result = JSON.parse(data);
        let title = result["Crypto Rating (FCAS)"];
        let BTCname = title["2. name"]
        let BTCsymbol = title["1. symbol"]
        let BTCfcas = title["3. fcas rating"]
        let BTCMarket = title["6. market maturity score"]
        let BTCDev = title["5. developer score"]
        let BTCFacscore = title["4. fcas score"]
        let BTCUtility = title["7. utility score"]
        console.log(result)
        // console.log(result)
        res.render("Home", {Btitle : BTCname, BSymbol : BTCsymbol, BFCAS : BTCfcas,
             BMarket : BTCMarket, BDev : BTCDev, BFacscore : BTCFacscore,
             BUtility : BTCUtility
            })
        
    })
}) 
})
app.listen(3000, (req, res)=>{
    console.log("app running on Port 3000")
})