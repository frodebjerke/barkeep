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


db.liquor.aggregate(
  [{
    $group: {
      _id: "$category.primary",
      count: {$sum: 1}
    }
  }]
)
