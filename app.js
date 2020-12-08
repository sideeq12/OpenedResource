const express = require("express");
const BodyParser = require("body-parser");
const https = require("https");
const { response } = require("express");

const app = express();
app.use(BodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs")


app.get("/", (req, res)=>{
    const url = "https://api.stlouisfed.org/fred/series?series_id=SMU16142609092161101&api_key=c8c81bfff01e8985bbbb8e22555c04a9&file_type=json#"
    https.get(url, (response)=>{
        // console.log(response.statusCode)
        response.on("data", (data)=>{
            const result = JSON.parse(data)
            let datas = result.seriess;
            let val = datas[0].title;
            let url1 = "https://api.stlouisfed.org/fred/series?series_id=SMU16142609092161101&api_key=c8c81bfff01e8985bbbb8e22555c04a9&file_type=json#"
            https.get(url1, (response)=>{
                response.on("data", (data)=>{
                    const output = JSON.parse(data);
                    let value2 = output.realtime_end;
                    res.render("Home", {data : val , value : datas, value2 : value2})
                })
            })
            
        })
        
    })
   
})
app.listen(3000, (req, res)=>{
    console.log("app running on Port 3000")
})