(function (bke) {
  bke.Liquor = function (data) {

  };

  bke.Liquor.getById = function (id) {
    return m.request({
      method: "GET",
      url: "/api/liquor/"+ id
    });
  }
})(window.bke = window.bke || {});
