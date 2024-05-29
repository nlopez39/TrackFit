const db = require("../config/connection");
const Diet = require("../models/Diet");
const Workout = require("../models/Workout");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  await cleanDB("Diet", "diets");
  await cleanDB("Workout", "workouts");

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

  const workouts = await Workout.insertMany([
    {
      bodyPart: "Chest",
      exercise: "Bench Press",
      workoutType: "Free Weights",
      sets: 3,
      reps: 8,
    },
    {
      bodyPart: "Chest",
      exercise: "Mid Cable Flys",
      workoutType: "Cables",
      sets: 3,
      reps: 9,
    },
    {
      bodyPart: "Chest",
      exercise: "Low to High Cable Flys",
      workoutType: "Cables",
      sets: 3,
      reps: 10,
    },
    {
      bodyPart: "Chest",
      exercise: "High to Low Cable Flys",
      workoutType: "Cables",
      sets: 3,
      reps: 11,
    },
    {
      bodyPart: "Chest",
      exercise: "Dumbbell Bench Press",
      workoutType: "Free Weights",
      sets: 3,
      reps: 12,
    },
    {
      bodyPart: "Chest",
      exercise: "Incline Bench Press",
      workoutType: "Free Weights",
      sets: 3,
      reps: 13,
    },
  ]);

  process.exit();
});
