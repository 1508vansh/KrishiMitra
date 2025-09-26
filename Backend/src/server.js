const express = require("express");
const cors = require("cors");
const handleAi = require("./handleAi");

const app = express();
app.use(express.json());

app.use(cors({
  origin: ['http://localhost:1234'],
  credentials: true
}));

app.post("/handleAi", async (req, res) => {
  try {
    const { message } = req.body;
    const response = await handleAi(message);
    res.status(200).send({ message: response });
  } catch (err) {
    console.log("error in quary process", err);
  }
});

app.listen(5000, () => {
  console.log("listening at port 5000");
});
