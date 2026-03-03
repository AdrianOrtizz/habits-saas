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
