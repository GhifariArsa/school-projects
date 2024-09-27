module.exports = (express, app) => {
    const controller = require("../controller/booking.controller.js");
    const router = express.Router();

    // get all bookings.
    router.get("/", controller.all);

    // Route to get bookings by a specific ID
    router.get("/:userId", controller.getBookingsByUserId);

    router.post("/insert", controller.createBooking);

    router.delete("/delete/:bookingId", controller.deleteBooking);

    // Add routes to server.
    app.use("/v1/bookings", router);

  };
  