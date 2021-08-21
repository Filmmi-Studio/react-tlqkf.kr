const express = require('express')
const app = express()
const path = require('path');
const config = require('./config/key');
const mongoose = require('mongoose')

const cookieParser = require("cookie-parser");





app.use(express.urlencoded({ extended: true }));

app.use(express.json());





mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.use(cookieParser());
app.use('/api/register', require('./routes/register'))
app.use('/api/search',require('./routes/search'))
app.use('/api/user',require('./routes/user'))

const port = 5000

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

//app.use(express.static(path.join(__dirname,"../client/build")));

// app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
//   });

