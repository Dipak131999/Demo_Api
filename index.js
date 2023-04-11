const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require("http").createServer(app);
const cors = require("cors");

const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.get("/ApiTest", (req, res) => {
  res.send("SUCCESS INDEX");
});

const routes = require("./routes/index");
app.use("/api/v1", routes);

http.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
