import express from "express";

const app = express();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Running on:", "http://localhost:8080/");
});
