var cassandra = require("cassandra-driver");
var async = require("async");
var csv = require("fast-csv");
var path = "contoh_data.csv";

// Connect to the cluster
var client = new cassandra.Client({contactPoints:['127.0.0.1'], keyspace : 'pendidikan'});
var documents = [];

csv
.fromPath(path,{headers : true, delimiter : ';'})
.on("data", function(data){
    documents.push(data);
})
.on("end", function(){
    
    for(var i in documents){
        var d = documents[i];
        var query = "INSERT INTO sd (no,guru,kecamatan,kelas,murid,sekolah) VALUES ("+d["No"]+","+d["Guru/Teacher"]+",'"+d["Kecamatan "]+"',"+d["Kelas/Class"]+","+d["Murid/Pupils"]+","+d["Sekolah/School"]+");";
        //console.log(query);
        client.execute(query,function(err,result){
            if(!err){
                console.log(result);
            }
            else{
                console.log(err);
            }
        });
    }
    console.log("Documents : ",documents.length);
});


