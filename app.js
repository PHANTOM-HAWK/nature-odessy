const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(express.json());

const tourRouter = require('./routers/tourRoutes');
const userRouter = require('./routers/userRoutes');
app.use(morgan('dev'));

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
