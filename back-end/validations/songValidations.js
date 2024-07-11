const requiredFields = (req, res, next) => {
  const {name, artist} = req.body;
  if (!name) {
    res.status(422).json({error: 'missing song name'});
  } else if (!artist) {
    res.status(422).json({error: 'missing artist name'});
  } else {
    next();
  }
};

module.exports = {requiredFields};
