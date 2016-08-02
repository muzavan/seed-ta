var csv = require("fast-csv");
var path = "contoh_data.csv";
var mongodb = require('mongodb');

var client = mongodb.MongoClient;
var url = "mongodb://user:27017/pendidikan";
var documents = [];
client.connect(url,function(err,db){
    if(err){
        console.log("Unable to connect to the MongoDB Server. Error : ",error);
    }
    else{
        console.log('Connection established to', url);
        
        csv
        .fromPath(path,{headers : true, delimiter : ';'})
        .on("data", function(data){
			data["Posisi"] = {"Kota" : "Sumedang","Provinsi" : "Jawa Barat","Kecamatan" : data["Kecamatan"],"Luas Kecamatan" : data["Kecamatan"].length};
			delete data["Kecamatan"];
            documents.push(data);
        })
        .on("end", function(){
            var collection = db.collection("sd");
            collection.insert(documents);
            console.log("INSERTING : "+documents.length);
            db.close(); 
        });
        
    }
});