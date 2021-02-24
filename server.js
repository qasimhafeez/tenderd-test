const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Loading Routes/api
const user = require("./routes/api/user");
const company = require("./routes/api/company");
const request = require("./routes/api/request");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB configuration
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Mongodb Connected!"))
  .catch((err) => console.log("connection error"));

// Routes
app.use("/api/user", user);
app.use("/api/company", company);
app.use("/api/request", request);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}.`));
