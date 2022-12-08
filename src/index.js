const express = require('express');
const app = express();
const cors = require('cors');

// middlewars
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use(require('./routes/index'));


app.listen(3000);
console.log('Server on Port 3000')