const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5001;
const NODE_ENV = process.env.NODE_ENV || "development";

// Middleware Includes

const initDb = require("./db/initDb");
initDb();

const sessionMiddleware = require("./modules/session-middleware");
const passport = require("./strategies/user.strategy");

// Route Includes
const userRouter = require("./routes/user.router");
const propertiesRouter = require("./routes/properties.router");
const defaultSettingsRouter = require("./routes/defaultSettings.router");

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("build"));

// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/user", userRouter);
app.use("/api/properties", propertiesRouter);
app.use("/api/defaultSettings", defaultSettingsRouter);

if (NODE_ENV === "production") {
  app.get("*", function (_, res) {
    res.sendFile("index.html", { root: "build" });
  });
}

// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
