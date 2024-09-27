const db = require("../database");

// Select all bookings from the database.
exports.all = async (req, res) => {
  const bookings = await db.Booking.findAll();

  res.json(bookings);
};


exports.getBookingsByUserId = async (req, res) => {
  const { userId } = req.params;

  const bookings = await db.Booking.findAll({
      where: { USER_ID: userId },
      include:[
        {
          model: db.Movie_Session,
          include:[
            {
              model: db.Movie,
            },
          ]
        },
      ]
    });

  res.json(bookings);
};

// insert a booking in the database.
exports.createBooking = async (req, res) => {
    try {
        // Creating the booking
        const booking = await db.Booking.create({
            USER_ID: req.body.USER_ID,
            MOVIE_SESSION_ID: req.body.MOVIE_SESSION_ID,
            SEATS_BOOKED: req.body.SEATS_BOOKED,
        });

        res.json(booking);
        // Catching SQL error if triggers to movie session table fails
    } catch (error) {
        console.error("SQL Error:", error.message);
        res.status(500).json({error: "Not sure!!"});
    }
};


exports.deleteBooking = async (req, res) => {
  const { bookingId } = req.params;

    try {
        const booking = await db.Booking.findOne({
            where: {
                ID: bookingId,
            },
        });

        await booking.destroy();

        res.status(200).json({ message: 'Booking Deleted successfully'});

    } catch (error) {
        console.error("SQL ERROR", error.message);
        res.status(500).json({message: error.message})
    }
}