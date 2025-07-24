const express = require('express');
const app = express();

const cors = require('cors');
const dbConnect = require('./config/db');
require('dotenv').config();

const port = process.env.PORT || 4000;

dbConnect();

app.use(express.json());
app.use(cors());

app.listen(port, ()=> {
    console.log(`server is running on http://localhost:${port}`);
})