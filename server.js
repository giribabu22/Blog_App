const express = require("express");
const app = express();
const hbs = require("hbs");
const fs = require('fs')

const port = 3000;

app.set("views", "views");
app.set("view engine", "hbs");

app.use(express.json());
app.use(express.urlencoded());

app.use("/registation", require("./routes/registation"));
app.use("/login", require("./routes/login"));
app.use("/home", require("./routes/home"));
app.use("/comments", require("./routes/comments"));
app.use("/profile", require("./routes/profile"));
app.use('/del',require('./routes/del'))

app.get("/logout", (req,res)=>{
    console.log('running');
    fs.writeFileSync('login.json',JSON.stringify({},null,3))
    res.cookie("user", undefined);
    res.redirect("http://localhost:3000/login");
})

app.listen( process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`));