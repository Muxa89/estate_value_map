var Datastore = require('nedb');
var db = new Datastore({filename : './database/tickets'});
db.loadDatabase();

module.exports.putTicket = function(ticket) {
    db.insert(ticket);
}