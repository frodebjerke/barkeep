var mongoose = require('mongoose');

var Liquor = mongoose.Schema({
  name: String,
  logged: Number,
  about: {
    producer: String,
    origin: String,
    region: String
  },
  images: {
    large: String,
    thumb: String
  },
  category: {
    primary: String,
     secondary: String,
     tertiary: String,
     style: String,
     varietal: String,
     tags: Array
  },
  notes: {
    serving_suggestion: String,
    tasting_note: String,
    description: String
  },
  contents: {
    kosher: Boolean,
    alcohol_content: Number,
    sugar: String
  },
  products: Array
}, {
  collection: "liquor"
});

mongoose.model('Liquor', Liquor);
