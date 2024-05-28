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
      reps: "6 - 10",
    },
    {
      bodyPart: "Chest",
      exercise: "Mid Cable Flys",
      workoutType: "Cables",
      sets: 3,
      reps: "8 - 12",
    },
    {
      bodyPart: "Chest",
      exercise: "Low to High Cable Flys",
      workoutType: "Cables",
      sets: 3,
      reps: "8 - 12",
    },
    {
      bodyPart: "Chest",
      exercise: "High to Low Cable Flys",
      workoutType: "Cables",
      sets: 3,
      reps: "8 - 12",
    },
    {
      bodyPart: "Chest",
      exercise: "Dumbbell Bench Press",
      workoutType: "Free Weights",
      sets: 3,
      reps: "8 - 12",
    },
    {
      bodyPart: "Chest",
      exercise: "Incline Bench Press",
      workoutType: "Free Weights",
      sets: 3,
      reps: "8 - 12",
    },
    {
      bodyPart: "Chest",
      exercise: "Dumbbell Incline Bench Press",
      workoutType: "Free Weights",
      sets: 3,
      reps: "8 - 12",
    },
    {
      bodyPart: "Chest",
      exercise: "Push-ups",
      workoutType: "At Home",
      sets: 3,
      reps: "12",
    },
    {
      bodyPart: "Chest",
      exercise: "Close-Grip Push-Ups",
      workoutType: "At Home",
      sets: 3,
      reps: "10",
    },
    {
      bodyPart: "Back",
      exercise: "Dumbbell/Barbell Rows",
      workoutType: "Free Weights",
      sets: 3,
      reps: "8 - 12",
    },
    {
      bodyPart: "Back",
      exercise: "Deadlift",
      workoutType: "Free Weights",
      sets: 3,
      reps: "5 - 7",
    },
    {
      bodyPart: "Back",
      exercise: "Lat Pulldowns",
      workoutType: "Cables",
      sets: 3,
      reps: "8 - 12",
    },
    {
      bodyPart: "Back",
      exercise: "Seated Cable Rows",
      workoutType: "Cables",
      sets: 3,
      reps: "8 - 12",
    },
    {
      bodyPart: "Back",
      exercise: "Pull-Ups",
      workoutType: "At Home",
      sets: 3,
      reps: "AMAP",
    },
    {
      bodyPart: "Legs",
      exercise: "Barbell Squat",
      workoutType: "Free Weights",
      sets: 3,
      reps: "8 - 12",
    },
    {
      bodyPart: "Legs",
      exercise: "Weighted Lunges",
      workoutType: "Free Weights",
      sets: 3,
      reps: "12 - 15",
    },

    {
      bodyPart: "Legs",
      exercise: "Body Weight Squat",
      workoutType: "At Home",
      sets: 3,
      reps: "15 - 20",
    },
    {
      bodyPart: "Arms",
      exercise: "Bicep Curls",
      workoutType: "Free Weights",
      sets: 3,
      reps: "15 - 20",
    },
  ]);

  process.exit();
});
