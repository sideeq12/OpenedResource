const express = require("express");
const BodyParser = require("body-parser");
const https = require("https");
const unirest = require("unirest")
const dotenv = require("dotenv");
dotenv.config()



const app = express();
app.use(express.static("public"))
app.use(BodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs")
const key = process.env.API;
const key2 = process.env.AP12    


app.get("/", (req, res)=>{
    // list of the crypto currencies url to be used in CRYPTO RATING SECTION
    const url = "https://www.alphavantage.co/query?function=CRYPTO_RATING&symbol=BTC&apikey="+key
    const ETH = "https://www.alphavantage.co/query?function=CRYPTO_RATING&symbol=ETH&apikey="+key
    const BCH = "https://www.alphavantage.co/query?function=CRYPTO_RATING&symbol=BCH&apikey="+key
    const XRP = "https://www.alphavantage.co/query?function=CRYPTO_RATING&symbol=XRP&apikey="+key
    const LTC = "https://www.alphavantage.co/query?function=CRYPTO_RATING&symbol=LTC&apikey="+key
    const WATCHLIST = "https://mboum.com/api/v1/tr/trending?apikey="+key2
 
// Sending https get request  to the url to get the data
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
        let Brefreshe = title["8. last refreshed"]
        let dataArray = []
        https.get(ETH, (response)=>{
            response.on("data", (data)=>{
                const eth = JSON.parse(data);
                const ethVal = eth["Crypto Rating (FCAS)"]
                dataArray.push(ethVal)
                https.get(BCH, (response)=>{
                    response.on("data", (data)=>{
                        const bch = JSON.parse(data);
                        const bchVal = bch["Crypto Rating (FCAS)"]
                        dataArray.push(bchVal)
                        https.get(XRP, (response)=>{
                            response.on("data", (data)=>{
                                const xrp = JSON.parse(data)
                                const xrpVal = xrp["Crypto Rating (FCAS)"]
                                dataArray.push(xrpVal)
                                https.get(LTC, (response)=>{
                                    response.on("data", (data)=>{
                                        const ltc = JSON.parse(data)
                                        const ltcVal = ltc["Crypto Rating (FCAS)"]
                                        dataArray.push(ltcVal)

                                       
                                        res.render("Home", {Btitle : BTCname, BSymbol : BTCsymbol, BFCAS : BTCfcas,
                                            BMarket : BTCMarket, BDev : BTCDev, BFacscore : BTCFacscore,
                                            BUtility : BTCUtility, Brefreshed : Brefreshe, dataArray : dataArray 
                                           })

                                       
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
       
        
    })
}) 

})
app.listen(3000, (req, res)=>{
    console.log("app running on Port 3000")
})