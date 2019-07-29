let db = require('./database.js');
let express = require('express');
let app = express();

app.use('', express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/ticket', function(req, res) { 
    console.log(req.body.newItems);
    // db.putTicket(req.body);
    res.send("OK");
});

app.listen(8080, () => ('Started on 8080'));