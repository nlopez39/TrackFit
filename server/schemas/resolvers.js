const { User, Diet } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("diets");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("diets");
    },
    diets: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Diet.find(params).sort({ createdAt: -1 });
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("diets");
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
  },
};

module.exports = resolvers;
