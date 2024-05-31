const db = require("../database");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Select all users from the database.
exports.all = async (req, res) => {
  const users = await db.User.findAll();

  res.json(users);
};

// Create a user in the database.
exports.create = async (req, res) => {
  try {
    // Hashing with bcrypt
    const hash = await bcrypt.hash(req.body.PASSWORD, saltRounds);
    console.log("Hash: ", hash);

    // Creating the user object
    const user = await db.User.create({
      EMAIL: req.body.EMAIL,
      USERNAME: req.body.USERNAME,
      PASSWORD: hash,
      JOIN_DATE: req.body.JOIN_DATE,
    });

    res.json(user);
    // Catching SQL error if duplicate username or email is found
  } catch (error) {
    console.error("SQL Error:", error.message);
    res.status(500).json({ error: "Duplicate Email or Username Found" });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await db.User.findAll({
      where: {
        EMAIL: req.body.EMAIL,
      },
    });
    if (
      user == null ||
      (await bcrypt.compare(req.body.PASSWORD, user[0].PASSWORD)) == false
    ) {
      //TODO fix issue login
      console.log(user);
      res.json(null);
    } else {
      res.json({
        EMAIL: user[0].EMAIL,
        USERNAME: user[0].USERNAME,
        JOIN_DATE: user[0].JOIN_DATE,
        ID: user[0].ID,
        BLOCKED: user[0].BLOCKED,
      });
    }
  } catch (error) {
    console.error("SQL ERROR:", error.message);
    res.status(500).json({ error: "User not found" });
  }
};

exports.getUserFromEmail = async (req, res) => {
  try {
    const user = await db.User.findAll({
      where: {
        EMAIL: req.body.EMAIL,
      },
    });

    res.json({
      EMAIL: user[0].EMAIL,
      USERNAME: user[0].USERNAME,
      JOIN_DATE: user[0].JOIN_DATE,
      ID: user[0].ID,
      BLOCKED: user[0].BLOCKED,
    });
  } catch (error) {
    console.error("SQL ERROR:", error.message);
    res.status(500).json({ error: "User not found" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await db.User.findOne({
      where: {
        EMAIL: req.body.OLD_EMAIL,
      },
    });

    const hash = await bcrypt.hash(req.body.PASSWORD, saltRounds);
    console.log("Hash: ", hash);

    const data = {
      ID: user.ID,
      EMAIL: req.body.EMAIL,
      USERNAME: req.body.USERNAME,
      PASSWORD: hash,
      BLOCKED: user.BLOCKED,
    };

    await user.update(data);
    await user.save();

    res.status(200).json({ message: "User updated successfully", user: user });
  } catch (error) {
    console.error("SQL ERROR", error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await db.User.findOne({
      where: {
        EMAIL: req.body.EMAIL,
      },
    });

    await db.Review.destroy({
      where: {
        USER_ID: user.ID,
      },
    });

    await db.Booking.destroy({
      where: {
        USER_ID: user.ID,
      },
    });

    await user.destroy();

    res.status(200).json({ message: "User Deleted successfully" });
  } catch (error) {
    console.error("SQL ERROR", error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.getUsernameFromId = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await db.User.findOne({
      where: {
        ID: userId,
      },
    });

    res.status(200).json(user.USERNAME);
  } catch (e) {
    res.status(500).json({ message: "User is not found" });
  }
};
