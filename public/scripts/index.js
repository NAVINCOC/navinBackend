//script/index.js

module.exports = {
  register: function(req, res) {
    console.log(req);
    res.status(200).send('got it');
  }
};
