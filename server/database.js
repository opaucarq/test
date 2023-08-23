const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  const uri = "mongodb+srv://oliwpaucar11:BwZTJlcfusA7kqWq@cluster0.cfcbuxh.mongodb.net/shop?retryWrites=true&w=majority";

  MongoClient.connect(uri)
  .then(client => {
    console.log('Connected!');
    _db = client.db()
    callback(client);
  })
  .catch(err=>{
    console.log(err)
    throw err;
  });
};

const getDb = () => {
  if(_db){
    return _db
  }
  throw 'No database found!'
}

// module.exports = mongoConnect;
exports.mongoConnect = mongoConnect;
exports.getDb = getDb