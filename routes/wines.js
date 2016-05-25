// exports.findAll = function(req, res) {
//     res.send([{name:'wine1'}, {name:'wine2'}, {name:'wine3'}]);
// };

// exports.findById = function(req, res) {
//     res.send({id:req.params.id, name: "The Name", description: "description"});
// };

var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    ObjectID = mongo.ObjectID,
    BSON = mongo.BSONPure;

var server = new Server('52.40.41.165', 27017, {auto_reconnect: true});
var db = new Db('myNewDatabase', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'myNewDatabase' database");
        db.collection('myCollection', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'myCollection' collection doesn't exist. Creating it with sample data...");
                //populateDB();
            }
        });
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving myCollection: ' + id);
    db.collection('myCollection', function(err, collection) {
        collection.findOne({'_id': ObjectID(id) }, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('myCollection', function(err, collection) {
        collection.find().toArray(function(err, items) {
            //console.log(items[0].name);
            res.send(items);
            //res.render('index', { movies : items });
        });
    });
};

exports.addwine = function(req, res) {
    var wine = req.body;
    console.log('Adding: ' + JSON.stringify(wine));
    db.collection('myCollection', function(err, collection) {
        collection.insert(wine, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result));
                //res.json({result : true, msg : wine});
                res.send(wine);
            }
        });
    });
}

// exports.updateWine = function(req, res) {
//     var id = req.params.id;
//     var wine = req.body;
//     console.log('Updating wine: ' + id);
//     console.log(JSON.stringify(wine));
//     db.collection('wines', function(err, collection) {
//         collection.update({'_id': ObjectID(id)}, wine, {safe:true}, function(err, result) {
//             if (err) {
//                 console.log('Error updating wine: ' + err);
//                 res.send({'error':'An error has occurred'});
//             } else {
//                 console.log('' + result + ' document(s) updated');
//                 res.send(wine);
//             }
//         });
//     });
// }

// exports.deleteWine = function(req, res) {
//     var id = req.params.id;
//     console.log('Deleting wine: ' + id);
//     db.collection('wines', function(err, collection) {
//         collection.remove({'_id': ObjectID(id)}, {safe:true}, function(err, result) {
//             if (err) {
//                 res.send({'error':'An error has occurred - ' + err});
//             } else {
//                 console.log('' + result + ' document(s) deleted');
//                 res.send(req.body);
//             }
//         });
//     });
// }

var populateDB = function() {

    var cmpe281 = [
    {
        value: "Hello World #1"
    }];

    db.collection('myCollection', function(err, collection) {
        collection.insert(cmpe281, {safe:true}, function(err, result) {});
    });

};