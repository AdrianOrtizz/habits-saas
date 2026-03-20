import mongoose from "mongoose";
import { z } from "zod";

const dailySchema = z.object({
  type: z.literal("daily"),
  timesPerWeek: z.number().min(1).max(7).optional(),
});

const weeklySpecificDaysSchema = z.object({
  type: z.literal("weekly_specific_days"),
  daysOfWeek: z
    .array(z.number().min(0).max(6))
    .min(1, "At least one day is required")
    .refine((items) => new Set(items).size === items.length, {
      message: "Days of week must be unique",
    }),
  timesPerWeek: z.number().min(1).max(7).optional(),
});

const weeklyTimesSchema = z.object({
  type: z.literal("weekly_times"),
  timesPerWeek: z.number().min(1).max(7),
});

export const frequencySchema = z.discriminatedUnion("type", [
  dailySchema,
  weeklySpecificDaysSchema,
  weeklyTimesSchema,
]);

export const createHabitSchema = z.object({
  name: z.string().min(1, "Habit name is required"),
  icon: z.string().min(1, "Habit icon is required"),
  frequency: frequencySchema,
});

export const updateHabitSchema = z.object({
  name: z.string().min(1, "Habit name is required").optional(),
  frequency: frequencySchema.optional(),
});

export const habitIdParamSchema = z.object({
  id: z.string().refine((value) => mongoose.Types.ObjectId.isValid(value), {
    message: "Invalid habit id",
  }),
});
