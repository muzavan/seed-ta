var redis = require('redis');
var client = redis.createClient(); //alternative createCient(port,host)

client.on("connect", function(){
    console.log("connected");
});

