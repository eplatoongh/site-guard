const path = require("path");
//const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const http = require("http");
const express = require("express");
const app = express();
const port = process.env.PORT || "3000";
const listen = () => {
  console.log(`listening on http://localhost:${port}`);
};
const mongoose = require("mongoose");
//const cookieParser = require("cookie-parser");
const adminRoutes = require("./routes/admin/index");
const server = http.createServer(app);
// const corsOptions = {
//   origin: ["http://localhost:5173"],
// };
//uses
//app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, "dist")));
app.use("/api/admin", adminRoutes);
//dbURI
//const dbURI = `mongodb://localhost:27017/site-guard`;
const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bsozzxj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`; //
const dbURIoptions = {};
//connection function
(async () => {
  await mongoose.connect(dbURI, dbURIoptions);
  console.log(`DB connected!`);

  server.listen(port, listen);
})();

//routes
app.get("/", (req, res) => {
  res.send("surver is running..");
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
