const express = require("express");
const BodyParser = require("body-parser");
const https = require("https");
const unirest = require("unirest")
const dotenv = require("dotenv");
const { link } = require("fs");
const { response } = require("express");
dotenv.config()


// declaring express app
const app = express();
app.use(express.static("public"))
app.use(BodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs")
const key = process.env.API;






//Yahoo news api global calling
var reqUni = unirest("GET", "https://apidojo-yahoo-finance-v1.p.rapidapi.com/news/v2/get-details");

reqUni.query({
    "uuid": "9803606d-a324-3864-83a8-2bd621e6ccbd",
    "region": "US"
});

reqUni.headers({
    "x-rapidapi-key": process.env.API3,
    "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
    "useQueryString": true
});

reqUni.end(function (res) {
    // if (res.error) throw new Error(res.error);

    let data = res.body
    let content1 = data.data
    let news = content1.contents
    let mess = news[0].content
    global.title = mess.title;
    let summary = mess.summary
    let linked = mess.canonicalUrl.url
    global.link1 = linked
    global.message = summary
    let Tickers = mess.finance.stockTickers
    global.tickers = Tickers
    // let link1 = link.url
    
})



// YAHOO HISTORICAL DATA

var req = unirest("GET", "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-historical-data");

req.query({
	"symbol": "AMRN",
	"region": "US"
});

req.headers({
	"x-rapidapi-key": "336218d839msh1637381c3d1b658p1423aajsn45e2a66bde89",
	"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
	"useQueryString": true
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);
    let result = res.body;
    let arrBody = result.prices
    global.price = arrBody.slice(0, 20);
    // console.log(price)
});


// Main page http apis calling
   // list of the crypto currencies url to be used in CRYPTO RATING SECTION
   const BTC = "https://www.alphavantage.co/query?function=CRYPTO_RATING&symbol=BTC&apikey="+key
   const ETH = "https://www.alphavantage.co/query?function=CRYPTO_RATING&symbol=ETH&apikey="+key
   const BCH = "https://www.alphavantage.co/query?function=CRYPTO_RATING&symbol=BCH&apikey="+key
   const XRP = "https://www.alphavantage.co/query?function=CRYPTO_RATING&symbol=XRP&apikey="+key
   const LTC = "https://www.alphavantage.co/query?function=CRYPTO_RATING&symbol=LTC&apikey="+key

// Sending https get request  to the url to get the data
let dataArray = []
https.get(BTC, (response)=>{
   response.on("data", (data)=>{
       let result = JSON.parse(data)
       let btc = result["Crypto Rating (FCAS)"]
       dataArray.push(btc)
   })
})
https.get(ETH, (response)=>{
    response.on("data", (data)=>{
        let result = JSON.parse(data)
        let eth = result["Crypto Rating (FCAS)"]
        dataArray.push(eth)
    })
})
app.get("/", (req, res)=>{
 


//     https.get(URL, (response)=>{
//         response.on("data", (data)=>{
//         const result = JSON.parse(data);
//         let title = result["Crypto Rating (FCAS)"];
//         let BTCname = title["2. name"]
//         let BTCsymbol = title["1. symbol"]
//         let BTCfcas = title["3. fcas rating"]
//         let BTCMarket = title["6. market maturity score"]
//         let BTCDev = title["5. developer score"]
//         let BTCFacscore = title["4. fcas score"]
//         let BTCUtility = title["7. utility score"]
//         let Brefreshe = title["8. last refreshed"]
//         let dataArray = []
//         https.get(ETH, (response)=>{
//             response.on("data", (data)=>{
//                 const eth = JSON.parse(data);
//                 const ethVal = eth["Crypto Rating (FCAS)"]
//                 dataArray.push(ethVal)
//                 https.get(BCH, (response)=>{
//                     response.on("data", (data)=>{
//                         const bch = JSON.parse(data);
//                         const bchVal = bch["Crypto Rating (FCAS)"]
//                         dataArray.push(bchVal)
//                         https.get(XRP, (response)=>{
//                             response.on("data", (data)=>{
//                                 const xrp = JSON.parse(data)
//                                 const xrpVal = xrp["Crypto Rating (FCAS)"]
//                                 dataArray.push(xrpVal)
//                                 https.get(LTC, (response)=>{
//                                     response.on("data", (data)=>{
//                                         const ltc = JSON.parse(data)
//                                         const ltcVal = ltc["Crypto Rating (FCAS)"]
//                                         dataArray.push(ltcVal)
//                                         // res.render("Home", {Btitle : BTCname, BSymbol : BTCsymbol, BFCAS : BTCfcas,
//                                         //     BMarket : BTCMarket, BDev : BTCDev, BFacscore : BTCFacscore,
//                                         //     BUtility : BTCUtility, Brefreshed : Brefreshe, dataArray : dataArray 
//                                         //    })
//                                     })
//                                 })
//                             })
//                         })
//                     })
//                 })
//             })
//         })
//     })
// }) 
console.log(dataArray)
res.render("Home", {message : message, title : title, url : link1,
     tickers : tickers, price : price, dataArray : dataArray
    })
})



// Port listening to render

let PORT = process.env.PORT || 3000
app.listen(PORT, (req, res)=>{
    console.log("app running on Port 3000")
})