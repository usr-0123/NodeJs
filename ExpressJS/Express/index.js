import express from "express";

const app = express();
const port = 8000;

app.get("/health", (req, res) => {
  res.status(200).send(`I am healthy bruh`);
});

//
app.get("/health", (req, res) => {
  res.status(200).send(`This is root`);
});

//
app.use(express.static("public"));

//
app.use("/images", express.static("images"));

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

app.get(
  "/go-net",
  (req, res, next) => {
    console.log("My first function.");
    next();
  },
  (req, res) => {
    console.log("am the next function")
    res.status(200).json({message:'am the next function'});
  }
);
