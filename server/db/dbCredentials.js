let dbCredentials;
if (process.env.DATABASE_URL) {
  dbCredentials = {
    url: process.env.DATABASE_URL,
    ssl: true,
  };
} else {
  dbCredentials = {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: "deal_lab_proto", // 	💥 Change this to the name of your database!
    ssl: false,
  };
}

module.exports = dbCredentials;
