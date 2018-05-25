const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const url = "mongodb://localhost:27017";

/**
 * Получение всех полей
 * @param req
 * @param res
 */
module.exports.getPackages = (req, res) => {
    MongoClient.connect(url, (err, client) => {
        let db = client.db('mydb');

        if (err) {
            return res.status(400).json({ err: err.message });
        }
        db
            .collection('docs')
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

/**
 * Получение одного полей по ID
 * @param req
 * @param res
 */
module.exports.getPackage = (req, res) => {
    try {
        var id = new ObjectID(req.params.id);
    } catch (err) {
        return res.status(400).json({ err: err.message });
    }

    MongoClient.connect(url, (err, client) => {
        let db = client.db('mydb');

        if (err) {
            return res.status(400).json({ err: err.message });
        }
        db
            .collection('docs')
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

/**
 * Добавление полей
 * @param req
 * @param res
 */
module.exports.addPackages = (req, res) => {

    MongoClient.connect(url, (err, client) => {
        let db = client.db('mydb');

        db.collection('docs').insert(req.body, (err, result) => {
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

/**
 * Редактирование полей по ID
 * @param req
 * @param res
 */
module.exports.editPackage = (req, res) => {
    try {
        var id = new ObjectID(req.params.id);
    } catch (err) {
        return res.status(400).json({ err: err.message });
    }

    MongoClient.connect(url, (err, client) => {
        let db = client.db('mydb');

        if (err) {
            return res.status(400).json({ err: err.message });
        }

        db.collection('docs').findOneAndUpdate(
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

/**
 * Удаление полей по ID
 * @param req
 * @param res
 */
module.exports.deletedPackage = (req, res) => {

    try {
        var id = new ObjectID(req.params.id);
    } catch (err) {
        return res.status(400).json({ err: err.message });
    }

    MongoClient.connect(url, (err, client) => {
        let db = client.db('mydb');
        if (err) {
            return res.status(400).json({ err: err.message });
        }
        db.collection('docs').deleteOne(
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