var mongoose = require('mongoose');

var Liquor = mongoose.Schema({
  // product info
  origin: String,
  updated_at: Date,
  stock_type: String,
  producer_name: String,
  is_discontinued: Boolean,
  is_dead: Boolean,
  product_no: Number,
  image_thumb_url: String,
  image_url: String,
  name: String,


  // category
  secondary_category: String,
  primary_category: String,
  tertiary_category: String,
  style: String,
  varietal: String,

  // metrics
  package_unit_type: String,
  package_unit_volume_in_milliliters: Number,
  total_package_units: Number,
  volume_in_milliliters: Number,
  alcohol_content: Number,
  package: String,

  // ingredients
  sugar_content: String,
  sugar_in_grams_per_liter: Number,
  is_kosher: Boolean,


  // price
  price_per_liter_of_alcohol_in_cents: Number,
  price_per_liter_in_cents: Number,
  regular_price_in_cents: Number,

  // meta-meta
  serving_suggestion: String,
  description: String,
  tags: String,
  tasting_note: String,


}, {
  collection: "liquor"
});

mongoose.model('Liquor', Liquor);
