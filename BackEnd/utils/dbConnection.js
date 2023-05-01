const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let _db;

const mongoClient = callback => {
    MongoClient.connect('mongodb://0.0.0.0:27017/expense', { useUnifiedTopology: true })
        .then(client => {
            console.log('Connected!');
            _db = client.db();
            callback();            
        })
        .catch(err =>{
            console.log(err);
            throw err;
        });
}

const getDb = () =>{
    if(_db){
        return _db;
    }
    throw 'Database not found!'
}


exports.MongoClient = mongoClient;
exports.getDb = getDb;