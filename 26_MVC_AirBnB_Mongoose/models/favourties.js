const { default: mongoose } = require("mongoose");
const { type } = require("node:os");

const bookingSchema = new mongoose.Schema({
  homeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Home",
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Favourites", bookingSchema);
