//script/index.js

module.exports = {
  register: function(req, res) {
    console.log(req.body);
    res.status(200).send('got it');
  }
};
