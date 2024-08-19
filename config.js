const mongoose = require("mongoose");

const configSchema = new mongoose.Schema({
  totalTimeInSeconds: {
    type: Number,
    required: true,
    default: 300,
  },
});

const Config = mongoose.model("Config", configSchema);

module.exports = Config;
