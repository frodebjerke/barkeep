{
    name: "Fireball",
    updated_at: new Date(),

    price: [{
      country: "canada",
      date: new Date(),
      price: 24
    }],

    category: {
      primary: "Spirits", // Beer, wine ..
      secondary: "Liquor", // Whiskey, Lager, White Wine
      tertiary: "Spice", // Scotch Single Malts, Pale Lager
      style: "", // Medium and floral, Light & hoppy
      varietal: "", // Scotland Malt, North American Lager
      tags: ["lager", "beer"]
    },

    contents: {
      sugar: 30,
      kosher: true,
      alcohol_content: 400
    }

    images: {
      large: "",
      medium: "",
      thumb: "",
      external: "",
      external_thumb: ""
    },

    packaging: {
      size_ml: 750,
    },

    about: {
      origin: "Canada, Quebec",
      producer_name: "Maeghers / Dekuyper"
    }

    notes: {
      serving_suggestion: "bla bla bla",
      description: ".......",
      tasting_note: "sooo good!"
    }
}
