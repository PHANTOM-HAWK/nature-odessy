const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');

const DB =
  'mongodb+srv://mongoAbhi:mongoAbhi@cluster1.dh9r9uk.mongodb.net/nature-odessy?retryWrites=true&w=majority';
const Tour = require('./../../models/tourmodel');
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('DB connection successful!'))
  .catch((err) => console.error('DB connection error:', err));
const tour = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);
const importData = async () => {
  try {
    await Tour.create(tour);
    console.log('successful');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
const deleteData = async () => {
  try {
    await Tour.deleteMany({});
    console.log('data successfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') importData();
else if (process.argv[2] === '--delete') deleteData();
