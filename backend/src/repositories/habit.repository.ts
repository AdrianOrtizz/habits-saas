import { HabitModel, HabitFrequency } from "../models/habit.model";
import { Types } from "mongoose";

export const createHabit = async (
  name: string,
  frequency: HabitFrequency,
  userId: string,
) => {
  return HabitModel.create({
    name,
    frequency,
    userId: new Types.ObjectId(userId),
  });
};

export const findHabitsByUser = async (userId: string) => {
  return HabitModel.find({ userId });
};

export const findHabitById = async (habitId: string) => {
  return HabitModel.findById(habitId);
};

export const updateHabit = async (
  habitId: string,
  data: Partial<{ name: string; frequency: HabitFrequency }>,
) => {
  return HabitModel.findByIdAndUpdate(habitId, data, { new: true });
};

export const deleteHabit = async (habitId: string) => {
  return HabitModel.findByIdAndDelete(habitId);
};
