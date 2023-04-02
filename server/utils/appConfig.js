require("express-async-errors");

const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const PORT = process.env.PORT;

// routers
const { urlPreviewRouter } = require("../routes");

const sessionConfig = session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 * 365,
  },
});

const cookieParserConfig = cookieParser();

const bodyParserConfig = bodyParser.json();

const corsConfig = cors({
  origin: `http://localhost:${PORT}`,
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
  credentials: true,
});

const createApp = () => {
  const app = express();
  app.use(sessionConfig);
  app.use(cookieParserConfig);
  app.use(bodyParserConfig);
  app.use(corsConfig);

  // use routers
  app.use("/urlpreview", urlPreviewRouter);

  return app;
};

const startApp = (app) => {
  console.log(`express: ${PORT}`);
  app.listen(PORT);
};

module.exports = {
  createApp,
  startApp,
};
