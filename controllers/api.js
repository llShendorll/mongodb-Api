const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const url = "mongodb://localhost:27017";
const dbName = 'demostand1';
const docName = 'posts';

module.exports.getPackages = (req, res) => {
    MongoClient.connect(url, (err, client) => {
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
                res.json(results);
            });
    });
};

module.exports.getPackage = (req, res) => {
    try {
        var id = new ObjectID(req.params.id);
    } catch (err) {
        return res.status(400).json({ err: err.message });
    }

    MongoClient.connect(url, (err, client) => {
        let db = client.db(dbName);

        if (err) {
            return res.status(400).json({ err: err.message });
        }
        db
            .collection(docName)
            .find({ _id: id })
            .toArray((err, results) => {
                if (err) {
                    return res.status(400).json({ err: err.message });
                }
                client.close();
                if (results.length > 0) {
                    res.json(results[0]);
                } else {
                    res.status(404).json({ err: 'Not found' });
                }
            });
    });
};

module.exports.addPackages = (req, res) => {

    MongoClient.connect(url, (err, client) => {
        let db = client.db(dbName);

        db.collection(docName).insert(req.body, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
                console.log(req.body);
            } else {
                res.send(result);
                console.log(req.body);
            }
        });
    });

};

module.exports.editPackage = (req, res) => {
    try {
        var id = new ObjectID(req.params.id);
    } catch (err) {
        return res.status(400).json({ err: err.message });
    }

    MongoClient.connect(url, (err, client) => {
        let db = client.db(dbName);

        if (err) {
            return res.status(400).json({ err: err.message });
        }

        db.collection(docName).findOneAndUpdate(
            {
                _id: id
            },
            {
                $set: req.body
            },
            {
                returnOriginal: false
            },
            (err, result) => {
                if (err) {
                    return res.status(404).json({ err: 'Not found' });
                }
                client.close();
                res.json(result.value);
            }
        );
    });
};

module.exports.deletedPackage = (req, res) => {

    try {
        var id = new ObjectID(req.params.id);
    } catch (err) {
        return res.status(400).json({ err: err.message });
    }

    MongoClient.connect(url, (err, client) => {
        let db = client.db(dbName);
        if (err) {
            return res.status(400).json({ err: err.message });
        }
        db.collection(docName).deleteOne(
            {
                _id: id
            },
            (err, result) => {
                if (err) {
                    return res.status(400).json({ err: err.message });
                }
                client.close();
                res.json({result: result.result.n});
            }
        );
    });
};