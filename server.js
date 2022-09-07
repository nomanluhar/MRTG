require('./models/db');
const express = require('express');
const dotenv = require('dotenv');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
var cookieParser = require('cookie-parser')
dotenv.config({ path: 'config.env' });

app.use(express.json());
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(cors({ credentials: true, origin: true, }));
app.use(cors({ origin: process.env.CLIENT_URL, optionsSuccessStatus: 200 }));

const userRoutes = require('./controllers/user-routes.js');

app.use('/',userRoutes);

var PORT = process.env.PORT || 8000;

app.listen(PORT,() =>  {
    console.log(`Server is running on PORT: http://localhost:${PORT}`);
});