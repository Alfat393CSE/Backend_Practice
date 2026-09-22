const { default: mongoose, model } = require("mongoose");
const { type } = require("node:os");

const homeSchema = new mongoose.Schema({
  houseName: { type: String, required: true },
  image: String,
  price: { type: String, required: true },
  rating: { type: String, required: true },
});

// homeSchema.pre("findOneAndDelete", async function () {
//   const homeId = this.getQuery()["_id"];
//   await Favourites.deleteMany({ homeId: homeId });
// });

module.exports = mongoose.model("Home", homeSchema);
