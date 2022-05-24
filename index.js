import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import userRouter from './src/routes/user.js'
import coursesRouter from './src/routes/courses.js'
import dotenv from 'dotenv'

const app = express();
dotenv.config();

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users", userRouter); //http://localhost:5000/users/
app.use("/curses", coursesRouter); //http://localhost:5000/tour/
app.get("/", (req, res) => {
   res.send("Helcome to Courses API");
})

const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL)
   .then(() => {
      app.listen(port, () => console.log(`Server running in port ${port}`));
   })
   .catch((error) => console.log(`${error} did not connect`));