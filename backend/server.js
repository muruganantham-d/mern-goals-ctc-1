const express = require("express");
const path = require("path");
const { errorHandler } = require("./middleware/errorMiddleware");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const colors = require("colors");
const connectDB = require("./config/db");

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalsRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  
  // * is any route are ant location:
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
}

app.use(errorHandler);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
