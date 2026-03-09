import { CompletionModel } from "../models/completion.model";

export const createCompletion = async (data: {
  habitId: string;
  userId: string;
  periodKey: string;
}) => {
  return CompletionModel.create(data);
};

export const findCompletionByHabitAndPeriod = async (
  habitId: string,
  periodKey: string,
) => {
  return CompletionModel.findOne({ habitId, periodKey });
};

export const findCompletionsByUserAndPeriod = async (
  userId: string,
  periodKey: string,
) => {
  return CompletionModel.find({ userId, periodKey });
};

export const findCompletionsForWeek = async (
  userId: string,
  start: Date,
  end: Date,
) => {
  return CompletionModel.find({
    userId,
    createdAt: { $gte: start, $lte: end },
  });
};

export const findHabitCompletions = async (userId: string, habitId: string) => {
  return CompletionModel.find({
    userId,
    habitId,
  }).sort({ createdAt: -1 });
};

export const deleteAllCompletionsByUserId = async (userId: string) => {
  return CompletionModel.deleteMany({ userId });
};

export const findCompletionsByUser = async (userId: string) => {
  return CompletionModel.find({ userId }).select("habitId periodKey").lean();
};
