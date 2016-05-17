var csv = require("fast-csv");
var path = "contoh_data.csv";
var redis = require('redis');
var client = redis.createClient(); //alternative createCient(port,host)

client.on("connect", function(){
    console.log("connected");
});

csv
 .fromPath(path,{headers : true, delimiter : ';'})
 .on("data", function(data){
     client.hmset("id-"+data["No"],data);
 })
 .on("end", function(){
     console.log("Done");
 });
 
 client.quit();