const express = require('express');
const cors = require('cors');
const routeRoutes = require('./routes/route');
const dotenv = require('dotenv').config();
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const port = process.env.PORT || 5000;

app.use('/api/route', routeRoutes);

app.listen(port, () => {
    console.log(`Working on ${port}`);
})