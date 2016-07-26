var csv = require("fast-csv");
var path = "contoh_data.csv";
var redis = require('redis');
var client = redis.createClient(); //alternative createCient(port,host)

client.select(0, function(err,res){
  // do nothing
});

client.on("connect", function(){
    console.log("connected");
});

csv
 .fromPath(path,{headers : true, delimiter : ';'})
 .on("data", function(data){
     if(data["No"] < 15){
         var d = data;
         var x = {
           "Guru" : d["Guru"],
           "Class" : d["Class"],
           "Murid" : d["Murid"],
           "School" : d["School"],
             
         };//d["No"]+","+d["Guru/Teacher"]+",'"+d["Kecamatan "]+"',"+d["Kelas/Class"]+","+d["Murid/Pupils"]+","+d["Sekolah/School"]+");";
         client.hmset("id-"+data["No"],x);
     }
     else{
		var d = data;
        var x = {};
		
		for(var k in d){
			if(k != "Guru"){
				x[k] = d[k];
			}
		}
        client.hmset("id-"+data["No"],x);   
     }
 })
 .on("end", function(){
     console.log("Done");
	 client.quit();
 });