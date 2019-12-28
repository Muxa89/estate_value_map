let express = require("express");
let app = express();

const PORT = 3000;

app.use("", express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/ticket", function(req, res) {
  console.log(req.body.newItems);
  // db.putTicket(req.body);
  res.send("OK");
});

app.listen(PORT, () => `Started on ${PORT}`);
