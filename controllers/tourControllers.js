const Tour = require('./../models/tourmodel');
//file reading

//functions
exports.touralias = async (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-avgRatings,price';
  next();
};
exports.getAllTour = async (req, res) => {
  try {
    let reqObj = { ...req.query };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((field) => {
      delete reqObj[field];
    });

    //advance filtering
    let temp = JSON.stringify(reqObj);
    temp = temp
      .replaceAll(/\bgte\b/g, '$gte')
      .replaceAll(/\bgt\b/g, '$gt')
      .replaceAll(/\blte\b/g, '$lte')
      .replaceAll(/\blt\b/g, '$lt');
    reqObj = JSON.parse(temp);
    console.log(reqObj);

    //sorting
    let query = Tour.find(reqObj);
    if (req.query.sort) {
      query = query.sort(req.query.sort);
    }
    //field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields); //projecting
    } else {
      query = query.select('-__v');
    }

    //page limiting
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;
    console.log(page, limit, skip);
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      let count = await Tour.countDocuments(reqObj);
      if (skip >= count) throw new Error('the page  does not exist');
    }

    const tours = await query;

    // const tours = await Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');
    res.status(200).json({
      status: 'success',
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err.message,
    });
  }
};
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(201).json({
      status: 'sucess',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: err.message,
    });
  }
};
exports.addTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.patchy = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: err.message,
    });
  }
};
exports.remove = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
    });
  }
};
