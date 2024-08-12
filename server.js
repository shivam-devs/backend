// importing the modules
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
import questions from "./models/trains.js";
// app config
const app = express();
dotenv.config();
//middlewares
app.use(
  cors({
    origin: ["https://tuf-flash-card.netlify.app","http://localhost:3000"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// routes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next(); // Pass control to the next middleware function
});
app.post("/api/question", async (req, res) => {
  const {
    type,
    incorrect_answers,
    difficulty,
    category,
    question,
    correct_answer,
  } = req.body;

  // validation
  const duplicateCheck = await questions.findOne({
    question,
  });

  if (duplicateCheck)
    return res.json({ msg: "question already exists" });

  // add new train
  const newTrain = await new questions({
    type,
    incorrect_answers,
    difficulty,
    category,
    question,
    correct_answer,
  });

  newTrain
    .save()
    .then((train) => {
      return res.status(200).json({
        'msg':'created !'
      });
    })
    .catch((err) => console.log(err));
});
app.get('/api/questions', async (req,res)=>{
  const outTrain = await questions.find().sort({ _id : -1});
  res.status(200).json(outTrain);
})
app.use(cors());

mongoose
  .connect("mongodb+srv://bdash625:1234Bx56@cluster0.xgqhej5.mongodb.net/?retryWrites=true&w=majority")
  .then(() => console.log(`Database Connected !`))
  .catch((err) => console.log(err));

//port
const PORT = process.env.PORT || 8080;


//listen
app.listen(PORT, () => console.log(`server started at ${PORT}`));
