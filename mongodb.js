const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'task-manager';

MongoClient.connect(url,{useUnifiedTopology:true},(error,client)=>{
  if(error){
    return console.log("unable to connect to database");;
  }

  const db = client.db(dbName);

      // db.collection('user').insertMany([
      //     {
      //         description:"d1",
      //         completed:true
      //     },
      //     {
      //       description:"d2",
      //       completed:false
      //     },
      //     {
      //       description:'d3',
      //       completed:false
      //     }
      //
      //     ],(error,result)=>{
      //
      //       if(error){
      //         return console.log("Unavle to write to database");;
      //       }
      //
      //         console.log(result.ops);
      //     });


      db.collection('user').findOne({_id:new ObjectId("5e09d4af4dc8943b45e44336")},(err,res)=>{
        if(err){
          return console.log("unable to fetch result");
        }

        console.log(res);
      });

      db.collection('user').find({completed:false}).toArray((err,doc)=>{

        if(err){
          return console.log(err);
        }

        console.log(doc);

      })







      });
