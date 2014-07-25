var mongoose = require('mongoose');

var Liquor = mongoose.Schema({
  name: String,
  about: {
    producer: String,
    origin: String
  },
  images: {
    external: String,
    external_thumb: String
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
