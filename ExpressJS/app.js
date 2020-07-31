var express = require("express");
var http = require("http");
var fs = require("fs");

// Creating a server in express
var app = express();
var server = http.createServer(app);

// Created Routing

app.get("/", function (req, res) {
  res.send("<h1>ExpressJS</h1>");
});

app.get("/tasks", function (req, res) {
  fs.readFile("./db.json", function (err, data) {
    var tasks = JSON.parse(data.toString()).tasks;
    res.json(tasks);
  });
});

app.get("/overview", function (req, res) {
  fs.readFile("./text.txt", function (err, data) {
    res.send(data.toString());
  });
});

server.listen(3000, function () {
  console.log("Server is running at 3000");
});
