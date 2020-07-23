const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const UserSchema = new Schema({
  fist_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  phone_number: {
    number: Number,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.export = User = Mongoose.model("Users", UserSchema);
