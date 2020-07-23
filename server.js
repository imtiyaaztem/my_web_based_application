const Express = require("express");
const Cors = require("cors");
const BodyParser = require("body-parser");
const App = Express();
const Mongoose = require("mongoose");
const Port = process.env.PORT || 3000;

App.use(BodyParser.json());
App.use(Cors());
App.use(BodyParser.urlencoded({ extended: false }));

const mongoURI = `mongodb+srv://imtiytem:imtiy007@my-app.irxkv.mongodb.net/my-app?retryWrites=true&w=majority`;
Mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MONGODB conected "))
  .catch((err) => console.log(err));

const User = require("./routes/Users");

App.use("/Users", User);

App.listen(Port, () => {
  console.log("Server is running on port:" + Port);
});
