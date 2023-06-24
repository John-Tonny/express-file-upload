const cors = require("cors");
const express = require("express");
const app = express();

global.__basedir = '/var/www';  //__dirname;

/*
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
*/

app.use(cors());
const initRoutes = require("./src/routes");

app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json({ limit: Defaults.MAX_POST_SIZE }));
// app.use(bodyParser.urlencoded({ limit: Defaults.MAX_POST_SIZE, extended: true }));

initRoutes(app);

let port = 8080;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`, 'from', new Date(),);
});
