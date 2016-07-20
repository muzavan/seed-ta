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
     if(data["No"] < 15){
         var d = data;
         var x = {
           "Guru/Teacher" : d["Guru/Teacher"],
           "Kelas/Class" : d["Kelas/Class"],
           "Murid/Pupils" : d["Murid/Pupils"],
           "Sekolah/School" : d["Sekolah/School"],
             
         };//d["No"]+","+d["Guru/Teacher"]+",'"+d["Kecamatan "]+"',"+d["Kelas/Class"]+","+d["Murid/Pupils"]+","+d["Sekolah/School"]+");";
         client.hmset("id-"+data["No"],x);
     }
     else{
		var d = data;
        var x = {};
		
		for(var k in d){
			if(k != "Guru/Teacher"){
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