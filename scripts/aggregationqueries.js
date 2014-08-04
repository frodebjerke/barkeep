// top 5 varietals
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

// all primary categories with count
db.liquor.aggregate(
  [{
    $group: {
      _id: "$category.primary",
      count: {$sum: 1}
    }
  }]
)

// #logged in each primary category
db.liquor.aggregate([
  {
    $group: {
      _id: "$category.primary",
      numlogged: {$sum: "$logged"}
    }
  }
]);
