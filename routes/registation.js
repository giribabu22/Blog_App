var express = require("express");
const connection_database = require("../db/data");
const routers = express.Router();

routers.use(express.urlencoded());

routers
  .route("")
  .get((req, res) => {
    res.render("registation", {
      title: "login form",
    });
  })
  .post(async (req, res) => {
    try {
      const bool = await connection_database("registation_data").insert(
        req.body
      );
      if (bool.length) {
        res.send("data insert to the database succussfully!!");
      } else {
        res.send("not yet!!");
      }
    } catch (error) {
      if (error.errno == 1062) {
        res.send("this email is already exist!!");
      } else {
        res.send(error.sqlMessage);
      }
    }
  });

module.exports = routers;
