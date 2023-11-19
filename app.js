const express = require("express");
const app = express();
const port = process.env.PORT || "3000";
const listen = () => {
  console.log(`listening on http://localhost:${port}`);
};
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

//local requires
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const { checkUser, requireAuth } = require("./middlewares/auth");

//view engine setup
app.set("view engine", `ejs`);

//uses
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/user", authRoutes);
app.use("/admin", adminRoutes);
app.use(express.static("public"));

//dbURI
const dbURI = `mongodb://localhost:27017/site-guard`;
const dbURIoptions = {};
//connection function
(async () => {
  await mongoose.connect(dbURI, dbURIoptions);
  console.log(`DB connected!`);

  app.listen(port, listen);
})();

//routes
app.get("*", checkUser);

app.get("/", (req, res) => {
  res.send("server is running..");
});

app.get("/show_users", requireAuth, (req, res) => {
  res.json({ method: "GET", url: "show_users", user: res.locals.user });
});

//uses
