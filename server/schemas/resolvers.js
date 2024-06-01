const { User, Diet, Workout, Goals } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("diets").populate("workouts");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("diets").populate("workouts");
    },
    diets: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Diet.find(params).sort({ createdAt: -1 });
    },
    workouts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Workout.find(params).sort({ createdAt: -1 });
    },
    goals: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Goals.find(params).sort({ createdAt: -1 });
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
          .populate("diets")
          .populate("workouts")
          .populate("goals");
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addDiet: async (parent, { food, calories, carbs }, context) => {
      if (context.user) {
        const diet = await Diet.create({
          food,
          calories,
          carbs,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { diets: diet._id } }
        );

        return diet;
      }
      throw AuthenticationError;
      ("You need to be logged in!");
    },
    updateDiet: async (parent, { _id, food, calories, carbs }) => {
      return await Diet.findOneAndUpdate(
        { _id },
        { food, calories, carbs },
        { new: true }
      );
    },
    //remove diet
    removeDiet: async (parent, { _id }, context) => {
      if (context.user) {
        const diet = await Diet.findOneAndDelete({ _id });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { diets: diet._id } }
        );
        return diet;
      }
    },
    //add a workout
    addWorkout: async (
      parent,
      { dayofWeek, bodyPart, exercise, caloriesBurned },
      context
    ) => {
      if (context.user) {
        const workout = await Workout.create({
          dayofWeek,
          bodyPart,
          exercise,
          caloriesBurned,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { workouts: workout._id } }
        );

        return workout;
      }
      throw AuthenticationError;
      ("You need to be logged in!");
    },

    //remove workout
    removeWorkout: async (parent, { _id }, context) => {
      if (context.user) {
        const workout = await Workout.findOneAndDelete({ _id });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { workouts: workout._id } }
        );
        return workout;
      }
    },
    //add Goal
    addGoal: async (parent, { goal, date }, context) => {
      if (context.user) {
        const goals = await Goals.create({
          goal,
          date,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { goals: goals._id } }
        );

        return goals;
      }
      throw AuthenticationError;
      ("You need to be logged in!");
    },
    removeGoal: async (parent, { _id }, context) => {
      if (context.user) {
        const goal = await Goals.findOneAndDelete({ _id });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { goals: goal._id } }
        );
        return goal;
      }
    },
    updateGoal: async (parent, { _id, goal, date }) => {
      return await Goals.findOneAndUpdate(
        { _id },
        { goal, date },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
