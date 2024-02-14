import express from "express";
import bodyParser from 'body-parser';

const app = express();
const port = 8000;

// middlewares
app.use(bodyParser.json());

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

app.get('/download' ,(req,res) => {
  res.download('./images/user1.png')
})

app.post ('/download', (req, res) => {
  let imgName = req.body.img
  res.download(`./images/${imgName}`)
})
