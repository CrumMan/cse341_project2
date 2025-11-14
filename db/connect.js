const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient

let _db;

const initDb = (callback) => {
    if(_db){
        console.log('Database has already been Initialtized')
        return callback(null, _db)    
    }
MongoClient.connect(process.env.MONGODB_URI)
.then((client) => {
    _db = client.db();
    callback(null,_db)
})
.catch((err) =>{
    callback(err)
})
}

const getDb = () => {
if(!_db){
    throw Error('Db not initialized')
}
return _db
}
module.exports = {
    getDb,
    initDb
}