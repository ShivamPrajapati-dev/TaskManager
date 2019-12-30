const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'task-manager';

MongoClient.connect(url,{useUnifiedTopology:true},(error,client)=>{
  if(error){
    return console.log("unable to connect to database");;
  }

  const db = client.db(dbName);

      db.collection('user').insertMany([
          {
              description:"d1",
              completed:true
          },
          {
            description:"d2",
            completed:false
          },
          {
            description:'d3',
            completed:false
          }

          ],(error,result)=>{

            if(error){
              return console.log("Unavle to write to database");;
            }

              console.log(result.ops);
          });
      });
