const express = require("express");
const routes = require("./routes");
const http = require("http");
const path = require("path");
const urlencoded = require("url");
const bodyParser = require("body-parser");
const json = require("json");
const logger = require("logger");
const methodOverride = require("method-override");
const nano = require("nano")("http://localhost:5948");

const db = nano.use("address");
const app = express();

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", routes.index);

app.post("/createdb", function (req, res) {
  nano.db.create(req.body.dbname, function (err) {
    if (err) {
      res.send("Error occured while creating database");
      return;
    }
    res.send("Database" + req.body.dbname + "created sucessfully");
  });
});

app.post("./new_contact", function (req, res) {
  var name = req.body.name;
  var phone = req.body.phone;

  db.insert({ name: name, phone: phone, crazy: true }, phone, function (
    err,
    body,
    header
  ) {
    if (err) {
      res.send("Error creating contact");
      return;
    }
    res.send("Contact created successfully");
  });
});

app.post("/view_contact", function (req, res) {
  var alldoc = "Following are the contacts";
  db.get(req.body.phone, { revs_info: true }, function (err, body) {
    if (!err) {
      console.log(body);
    }
    if (body) {
      alldoc += "Name: " + body.name + "<br/>Phone Number: " + body.phone;
    } else {
      alldoc = "No records found";
    }
    res.send(alldoc);
  });
});

app.post("/delete_contact", function (req, res) {
  db.get(req.body.phone, { revs_info: true }, function (err, body) {
    if (!err) {
      db.destroy(req.body.phone, body._rev, function (err, body) {
        if (err) {
          res.send("error deleting contact");
        }
      });
      res.send("contacts deleted sucessfully");
    }
  });
});

http.createServer(app).listen(app.get("port"), function () {
  console.log("Express server listening on port" + app.get("port"));
});
