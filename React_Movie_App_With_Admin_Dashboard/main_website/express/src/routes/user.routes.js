module.exports = (express, app) => {
    const controller = require("../controller/user.controller.js");
    const router = express.Router();
  
    // Select all users.
    router.get("/", controller.all);

    router.post("/create", controller.create);

    router.post("/login", controller.login);

    router.post("/username", controller.getUserFromEmail);

    router.post("/update", controller.updateUser);

    router.post("/delete", controller.deleteUser);

    router.get("/id/:userId", controller.getUsernameFromId);
  
    // Add routes to server.
    app.use("/v1/users", router);
  };
  