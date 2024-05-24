const db = require("../config/connection");
const Diet = require("../models/Diet");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  await cleanDB("Diet", "diets");

  const diets = await Diet.insertMany([
    {
      food: "Cheese Burger",
      calories: 350,
      carbs: 40,
    },
    {
      food: "Pepperoni Pizza",
      calories: 270,
      carbs: 30,
    },

    {
      food: "Yogurt",
      calories: 100,
      carbs: 10,
    },

    {
      food: "Oatmeal",
      calories: 110,
      carbs: 40,
    },
  ]);

  console.log("diets seeded");

  process.exit();
});
