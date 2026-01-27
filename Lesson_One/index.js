const express = require("express");
const app = express();

app.get("/", (req, res) => {
  console.log("yo You've hit the request!");
  res.send("Hi there!");
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
console.log("hi world!");
console.log("Testing");
console.log("is it short?");

// const express = require("express");
// const app = express();

// // Middleware for parsing JSON (useful later)
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Hi there!");
// });

// // Use environment port or default to 8080
// const PORT = process.env.PORT || 8080;

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
