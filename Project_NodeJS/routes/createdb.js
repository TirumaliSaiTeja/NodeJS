exports.create = function (req, res) {
  nano.db.create(req.body.dbname, function () {
    if (err) {
      res.send("Error while creating database");
      return;
    }
    res.send("Database created sucessfully");
  });
};
