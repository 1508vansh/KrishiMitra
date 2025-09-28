const express = require("express");
const cors = require("cors");
const handleAi = require("./handleAi");

const app = express();
app.use(express.json());

app.use(cors({
  origin: ['http://localhost:1234','https://krishimitra0.netlify.app'],
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

app.listen(process.env.PORT, () => {
  console.log(`listening at port ${process.env.PORT}`);
});
