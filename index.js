import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import postsRouter from "./routes/posts.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postsRouter);

app.get("/", (req, res) => {
    res.send("Hello to memories API");
});

// connect our server application with mongoDB
// for that we gono use mongoDB most specifically their cloud/atlas version
// of mongoDB which mean we can host our DB on their cloud.
// goto > mongdb.com/cloud/atlas.

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose
    .connect(CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() =>
        app.listen(PORT, () => console.log(`server running on port ${PORT}`))
    )
    .catch((error) => console.log(error.message));
