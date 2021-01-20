const fs=require("fs");
const http=require("http");
const requests=require("requests");


const homeFile=fs.readFileSync("./index.html","utf-8");

const replaceVal=(homeHtmlData,curIndCont,ind)=>{
    // replacing HTML content (whereever it required) with API data 
    let addConToHtml = homeHtmlData.replace("{%tempVal%}",curIndCont.main.temp);
        addConToHtml = addConToHtml.replace("{%tempMinVal%}",curIndCont.main.temp_min);
        addConToHtml = addConToHtml.replace("{%tempMaxVal%}",curIndCont.main.temp_max);
        addConToHtml = addConToHtml.replace("{%location%}",curIndCont.name);
        addConToHtml = addConToHtml.replace("{%country%}",curIndCont.sys.country);
        addConToHtml = addConToHtml.replace("{%tempStatus%}",curIndCont.weather[ind].main);

        // console.log(addConToHtml);
        return addConToHtml;
}

const server=http.createServer((req,res)=>{
   if(req.url=="/"){
    requests(
    'http://api.openweathermap.org/data/2.5/weather?q=chennai&units=metric&appid=f41db92b8cf9cb8834a7aed7733627d9')
    .on('data', (chunk)=> {
    const objData=JSON.parse(chunk);
    const arrObj=[objData];

    const realTimeData=arrObj.map((val,ind)=>replaceVal(homeFile,val,ind)).join("");
        // console.log(realTimeData); 
        // now we need to pass the converted string as a resonse
        res.write(realTimeData);
    })
    .on('end', (err) =>{
      if (err) return console.log('connection closed due to errors', err);
      console.log('end');
      res.end();
    });
   }
   else{
    // console.log("file not found");
    res.end("404, File not found");
   }
});


server.listen(3000,"127.0.0.1");
console.log(`Server listening on POrt 3000`);
