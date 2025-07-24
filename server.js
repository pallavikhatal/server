const express = require('express');
const app = express();

const cors = require('cors');
const dbConnect = require('./config/db');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const jobRoutes = require('./routes/jobRoutes');

const port = process.env.PORT || 4000;

dbConnect();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);

app.listen(port, ()=> {
    console.log(`server is running on http://localhost:${port}`);
})