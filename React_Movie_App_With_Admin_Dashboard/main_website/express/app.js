const express = require('express');
const app = express();

require('./src/routes/user.routes.js')(express, app);

module.exports = app;