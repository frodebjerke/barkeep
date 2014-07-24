db.liquor.aggregate(
  [{
    $group: {
      _id: "$category.varietal",
      count: {$sum: 1}
    }
  }, {
    $sort: {count: -1}
  }, {
    $limit: 5
  }])
