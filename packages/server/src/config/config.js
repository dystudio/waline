const {
  JWT_TOKEN,
  LEAN_KEY,
  MYSQL_DB,
  MYSQL_PASSWORD,
  SQLITE_PATH,
  PG_DB,
  PG_PASSWORD,
  MONGO_DB,
  MONGO_PASSWORD,
} = process.env;

let storage = 'leancloud';
let jwtKey = JWT_TOKEN || LEAN_KEY;
if (MONGO_DB) {
  storage = 'mongodb';
  jwtKey = jwtKey || MONGO_PASSWORD;
} else if (PG_DB) {
  storage = 'mysql';
  jwtKey = jwtKey || PG_PASSWORD;
} else if (SQLITE_PATH) {
  storage = 'mysql';
} else if(MYSQL_DB) {
  storage = 'mysql';
  jwtKey = jwtKey || MYSQL_PASSWORD;
}
module.exports = {
  workers: 1,
  storage, 
  jwtKey  
};
