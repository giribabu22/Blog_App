const connection_database = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    database: "jws_crud",
    password: "Prem@630",
    user: "root",
  },
});

async function call() {
  const exist = await connection_database.schema.hasTable("registation_data");
  if (!exist) {
    await connection_database.schema.createTable(
      "registation_data",
      (table) => {
        table.string("username");
        table.string("password");
        table.string("email").primary();
      }
    );
    console.log("newly created registation_data!!");
  }
}
call();

async function call2() {
  const exist = await connection_database.schema.hasTable("posts_data");
  if (!exist) {
    await connection_database.schema.createTable("posts_data", (table) => {
      table.specificType("id", "tinyint(1) primary key auto_increment");
      table.string("date");
      table.string("email");
      table.string("massage", 2000);
      table.string("url", 3000);
      table.integer("likes");
      table.integer("dislike");
    });
    console.log("newly created posts_data!!");
  }
}
call2();

async function call3() {
  const exist = await connection_database.schema.hasTable("comments");
  if (!exist) {
    await connection_database.schema.createTable("comments", (table) => {
      table.specificType("id", "tinyint(1) primary key auto_increment");
      table.string("date");
      table.string("user_email");
      table.string("post_id");
      table.string("feeling_msg",2000);
    });
    console.log("newly created comments!!");
  }
}
call3();
async function call4() {
  const exist = await connection_database.schema.hasTable("feedback");
  if (!exist) {
    await connection_database.schema.createTable("feedback", (table) => {
      table.specificType("id", "tinyint(1) primary key auto_increment");
      table.string("date");
      table.string("user_email");
      table.string("post_id");
      table.string("feedback");
    });
    console.log("newly created feedback!!");
  }
}
call4();

module.exports = connection_database;
