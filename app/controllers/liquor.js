var mongoose = require("mongoose");
var Liquor = mongoose.model('Liquor');
var common = require("./common")

exports.search = function (req, res) {
  Liquor.textSearch(req.params.query, function (err, out) {
    if (err) common.error(err, res);

    res.send(out.results.map(function (e) {
      var l = e.obj;
      l.image_url = l.image_url || "static/dummy.jpg";
      l.image_thumb_url = l.image_thumb_url || "static/dummy.jpg";
      return l;
    }));
  });
};
