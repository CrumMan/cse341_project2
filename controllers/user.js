const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    mongodb
    .getDb()
    .collection('user')
    .find()
    .toArray().then((user) => {
        res.setHeader('content-type',' application/json')
        res.status(200).json(user)
    })
}

const getSingle = async(req,res) => {
    if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid user ID format' });
  }
    const userId = new ObjectId(req.params.id)
    mongodb
    .getDb()
    .collection('user')
    .find({_id: userId})
    .toArray()
    .then((user) => {
        if (!user[0]) {
        return res.status(404).json({ message: 'User not found' });
      }
        res.setHeader('content-type',' application/json')
         res.status(200).json(user[0])
    })
}

const createUser = async (req,res) => {
    const user = {
        name: req.body.name,
        username: req.body.username,
        Password: req.body.Password,
        email: req.body.email,
        auth: req.body.auth
    }
    const response = await mongodb
    .getDb()
    .collection('user')
    .insertOne(user)

    if(response.acknowledged > 0){
        res.status(204).send()
    } else {
        res.status(500).json(response.error || "An error occoured updating the server" )
    }
}

const updateUser = async (req,res) => {
    const userId = new ObjectId(req.params.id);
    const user = {
        name: req.body.name,
        username: req.body.username,
        Password: req.body.Password,
        email: req.body.email,
        auth: req.body.auth
    }
    const response = await mongodb
    .getDb()
    .collection('user')
    .replaceOne({ _id: userId }, user)

    res.status(201).json({ id: response.insertedId })

    if(response.modifiedCount > 0){
        res.status(204).send()
    } else {
        res.status(500).json(response.error || "An error occoured updating the server" )
    }
}
const deleteUser = async (req,res) => {
    const userId = new ObjectId(req.params.id)
    const response = await mongodb
    .getDb()
    .collection('user')
    .deleteOne({_id: userId},true)
    if (response.deletedCount > 0){
        res.status(204).send()
    } else {
        res.status(500).json(response.error || "Some Error occoured while deleting the user")
    }
}

module.exports = {
getAll,
getSingle,
createUser,
updateUser,
deleteUser
}