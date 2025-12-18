require("dotenv").config();

module.exports = {
  app: {
    port: process.env.PORT,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "clave_secreta",
  },
  mysql: {
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "root",
    database: process.env.MYSQL_DATABASE || "test",
  },
};
