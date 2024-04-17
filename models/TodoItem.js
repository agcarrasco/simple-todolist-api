const mongoose = require("mongoose");

const schema = mongoose.Schema({
  details: String,
  isCompleted: Boolean,
});

module.exports = mongoose.model("TodoItem", schema);
