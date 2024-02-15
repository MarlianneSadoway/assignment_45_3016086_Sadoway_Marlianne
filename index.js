import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import monsterRoutes from "./routes/monster.route.js";
import { connectDB } from "./database/database.js";

const PORT = 8000;
const app = express();
app.use(cors());

connectDB();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// routes
app.use("/monsters", monsterRoutes);
app.use(function(req, res) {res.status(404).send(`Invalid endpoint`);}); // gives this error if 1 of the 5 endpoints was not reached, for example, delete with no id specified 

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}!`);
});