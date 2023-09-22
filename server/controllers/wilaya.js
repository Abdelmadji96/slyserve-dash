import connection from "../db.js";

export const getWilayas = (req, res) => {
  connection.query("select * from wilaya", (err, rows) => {
    if (!err) {
      res.status(200).send(rows);
    } else {
      res.status(403).send(err);
    }
  });
};
