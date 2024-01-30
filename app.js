const dotenv = require("dotenv");
dotenv.config();

const http = require("http");
const socketIo = require("socket.io");
const express = require("express");
const app = express();
const port = process.env.PORT || "3000";
const listen = () => {
  console.log(`listening on http://localhost:${port}`);
};
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: [
      "http://127.0.0.1:5500",
      "http://localhost:8081",
      "https://site-guard-app.onrender.com",
      "https://guard-track-site-guard.netlify.app",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

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
app.get("*", checkUser);

app.get("/", (req, res) => {
  res.send("server is running..");
});

app.get("/show_users", requireAuth, (req, res) => {
  res.json({ method: "GET", url: "show_users", user: res.locals.user });
});

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("A user connected");

  // Handling events (e.g., 'chat message')
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg); // Broadcast the message to all connected clients
  });
  // Handling events (e.g., 'chat message')
  socket.on("btnClicked", (msg) => {
    io.emit("btnClicked", msg); // Broadcast the message to all connected clients
  });

  // Handling disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

//uses
