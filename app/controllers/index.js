'use strict';

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const url = "mongodb://localhost:27017";
const dbName = 'demostand1';
const docName = 'posts';

module.exports.sendData = function (req, res) {
    MongoClient.connect(url, {"useNewUrlParser": true}, (err, client) => {
        let db = client.db(dbName);

        if (err) {
            return res.status(400).json({ err: err.message });
        }

        db
            .collection(docName)
            .find()
            .toArray((err, results) => {
                if (err) {
                    return res.status(400).json({ err: err.message });
                }
                client.close();

                res.render('index', {contents: results});
            });
    });
};