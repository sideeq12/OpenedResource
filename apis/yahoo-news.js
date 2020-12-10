



var reqUni = unirest("GET", "https://apidojo-yahoo-finance-v1.p.rapidapi.com/news/v2/get-details");

reqUni.query({
    "uuid": "9803606d-a324-3864-83a8-2bd621e6ccbd",
    "region": "US"
});

reqUni.headers({
    "x-rapidapi-key": "336218d839msh1637381c3d1b658p1423aajsn45e2a66bde89",
    "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
    "useQueryString": true
});


reqUni.end(function (res) {
    // if (res.error) throw new Error(res.error);

    let data = res.body
    let content1 = data.data
    let news = content1.contents
    let mess = news[0].content
    let title = mess.title;
    let summary = mess.summary
    let link = mess.canonicalUrl[0]
    // let link1 = link.url
    console.log(news)
    
})