const { Diet, Workout } = require("../models");

module.exports = async () => {
  try {
    // Drop the 'diets' collection
    await Diet.collection.drop();
    await Workout.collection.drop();
    console.log("Diets/Workout collection dropped successfully.");
  } catch (error) {
    console.error("Error dropping workout collection:", error);
    throw error;
  }
};
