const express = require("express");
const cors = require("cors");
const handleAi = require("./handleAi");

const app = express();
app.use(express.json());

// app.use(cors({
//   origin: ['',''],
//   credentials: true
// }));

const allowedOrigins = [
  'http://localhost:1234',           // local dev
  'https://krishisakhi1.netlify.app' // production frontend
];

// CORS options
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

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
