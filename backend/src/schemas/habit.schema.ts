import { z } from "zod";

const dailySchema = z.object({
  type: z.literal("daily"),
});

const monthlySchema = z.object({
  type: z.literal("monthly"),
});

const weeklySpecificDaysSchema = z.object({
  type: z.literal("weekly_specific_days"),
  daysOfWeek: z
    .array(z.number().min(0).max(6))
    .min(1, "At least one day is required"),
});

const weeklyTimesSchema = z.object({
  type: z.literal("weekly_times"),
  timesPerWeek: z.number().min(1).max(7),
});

export const frequencySchema = z.discriminatedUnion("type", [
  dailySchema,
  monthlySchema,
  weeklySpecificDaysSchema,
  weeklyTimesSchema,
]);

export const createHabitSchema = z.object({
  name: z.string().min(1, "Habit name is required"),
  frequency: frequencySchema,
});

export const updateHabitSchema = z.object({
  name: z.string().min(1, "Habit name is required").optional(),
  frequency: frequencySchema.optional(),
});
