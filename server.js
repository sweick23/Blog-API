

const express = require('express');
const morgan = require('morgan');

const app = express();

const apiRouter = require('./apiRouter');


app.use(morgan('common'));

app.use(express.static('public'));



app.use('/apiRouter', apiRouter);


app.listen(process.env.PORT || 8080, () => {
    console.log(`your app is listening on port ${process.env.PORT || 8080}`);
});

