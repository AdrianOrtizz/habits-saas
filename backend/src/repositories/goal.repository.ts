import { GoalModel, GoalDocument } from "../models/goal.model";
import { GoalCreate } from "../types/goal.types";
import { Types } from "mongoose";

export const findGoalsByWeek = async (
  userId: string,
  weekKey: string,
): Promise<GoalDocument[]> => {
  return await GoalModel.find({
    userId: new Types.ObjectId(userId),
    weekKey,
  }).sort({ createdAt: 1 });
};

export const findGoalById = async (
  goalId: string,
): Promise<GoalDocument | null> => {
  return await GoalModel.findById(goalId);
};

export const create = async (
  goalData: Partial<GoalDocument>,
): Promise<GoalDocument> => {
  return await GoalModel.create(goalData);
};

export const update = async (
  goalId: string,
  userId: string,
  updateData: Partial<GoalDocument>,
): Promise<GoalDocument | null> => {
  return await GoalModel.findOneAndUpdate(
    { _id: goalId, userId: new Types.ObjectId(userId) },
    updateData,
    { returnDocument: "after" },
  );
};

export const remove = async (
  goalId: string,
  userId: string,
): Promise<GoalDocument | null> => {
  return await GoalModel.findOneAndDelete({
    _id: goalId,
    userId: new Types.ObjectId(userId),
  });
};

export const insertManyGoals = async (
  goals: GoalCreate[],
): Promise<GoalDocument[]> => {
  return await GoalModel.insertMany(goals);
};
