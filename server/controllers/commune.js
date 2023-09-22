import connection from "../db.js";

export const getCommunes = (req, res) => {
  const { wilaya_id } = req.body;
  connection.query(
    "select * from commune where wilaya_id = ?",
    [wilaya_id],
    (err, rows) => {
      if (!err) {
        res.status(200).send(rows);
      } else {
        res.status(403).send(err);
      }
    }
  );
};
