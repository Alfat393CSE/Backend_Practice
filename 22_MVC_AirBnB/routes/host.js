const express = require("express");
const host = express.Router();
const hostController = require("../controller/hostController");

host.get("/", hostController.getHomePage);
host.get("/home-list", hostController.getHomeList);
host.get("/bookings", hostController.bookings);
host.post("/bookings", hostController.myBookings);
host.get("/user/edit-home/:homeId", hostController.getEditHome);
host.post("/user/edit-home/", hostController.postEditHome);

exports.host = host;
