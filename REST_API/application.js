const express = require("express");
const { createServer } = require("http");

const app = express();

var server = http.createServer(app);

let people = { people: [{ name: "Sai" }] };

app.get("/people", (req, res) => {
  res.send("Welcome");
});

app.post("/people", (req, res) => {
  res.json(people);
  res.end();
});

server.listen(3000, () => {
  console.log("Server is started");
});
