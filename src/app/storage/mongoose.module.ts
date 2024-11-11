import mongoose,{ConnectionOptions} from "mongoose";
import config from "../../config";

var db = mongoose.connection;

db.on('connecting', function() {
  console.log('%s\x1b[32m%s\x1b[0m','[storage] ','Conectandose a Mongo...');
});

db.on('disconnected', function() {
  console.log('MongoDB disconnected!');
  setTimeout(connect, 5000);
});

db.on('connected', function() {
  console.log('%s\x1b[32m%s\x1b[0m','[storage] ','Conección a Mongo establecida');
});

db.on('error', function(error) {
  console.error('Error in MongoDb connection: ' + error);
  mongoose.disconnect();
});

async function connect(){
    //const mongoUri     = `mongodb+srv://${config.mongo_user}:${config.mongo_pass}@${config.mongo_uri}/${config.mongo_db}`;
    const mongoUri     =  "mongodb://localhost:27017/db";
  
    const options: ConnectionOptions = {
        useNewUrlParser: true,
        useUnifiedTopology :true,
        useCreateIndex: true,
        useFindAndModify: false
    };
    mongoose.connect(`${mongoUri}`, options,
    (err) => {
        if (err) {
          console.error('Failed to connect to mongo on startup - retrying in 5 sec');
          setTimeout(connect, 5000);
        }
      });
}

async function connect_testing(){
    const mongoUri     =  "mongodb://localhost:27017/db_testing";
    
      const options: ConnectionOptions = {
          useNewUrlParser: true,
          useUnifiedTopology :true,
          useCreateIndex: true,
          useFindAndModify: false
      };
      mongoose.connect(`${mongoUri}`, options,
      (err) => {
          if (err) {
            console.error('Failed to connect to mongo on startup - retrying in 5 sec');
            setTimeout(connect, 5000);
          }
        });
}

async function disconnect(){
  mongoose.disconnect();
}

export default {connect, disconnect, connect_testing};
