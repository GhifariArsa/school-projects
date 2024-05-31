const express = require("express");
const cors = require("cors");
const db = require("./src/database");

db.sync();

const app = express();

// Parse requests of content-type - application/json.
app.use(express.json());

app.use(cors());

// Routes
require("./src/routes/movie.routes.js")(express, app);
require("./src/routes/user.routes.js")(express, app);
require("./src/routes/session.routes.js")(express, app);
require("./src/routes/booking.routes.js")(express, app);
require("./src/routes/review.routes.js")(express, app);


// Set port, listen for requests.
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
