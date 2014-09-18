(function (bke) {
  bke.Liquor = function (data) {

  };

  bke.Liquor.getById = function (id) {
    return m.request({
      method: "GET",
      url: "/api/liquor/"+ id
    });
  };

  bke.Liquor.getAll = function (term) {
    return m.request({
      method: "GET",
      url: "/search/liquor/"+ term()
    });
  };
})(window.bke = window.bke || {});
