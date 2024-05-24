const Diet = require("../models/Diet");

module.exports = async () => {
  try {
    // Drop the 'diets' collection
    await Diet.collection.drop();
    console.log("Diets collection dropped successfully.");
  } catch (error) {
    console.error("Error dropping diets collection:", error);
    throw error;
  }
};
