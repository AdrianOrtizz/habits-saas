import { Schema, model, Types } from "mongoose";

export type HabitFrequency =
  | { type: "daily" }
  | { type: "weekly_specific_days"; daysOfWeek: number[] }
  | { type: "weekly_times"; timesPerWeek: number }
  | { type: "monthly" };

export interface HabitDocument {
  name: string;
  frequency: HabitFrequency;
  userId: Types.ObjectId;
  createdAt: Date;
}

const habitSchema = new Schema<HabitDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    frequency: {
      type: {
        type: String,
        enum: ["daily", "weekly_specific_days", "weekly_times", "monthly"],
        required: true,
      },
      daysOfWeek: {
        type: [Number],
        validate: {
          validator: function (this: any, value: number[]) {
            if (this.type === "weekly_specific_days") {
              return Array.isArray(value) && value.length > 0;
            }
            return true;
          },
          message: "daysOfWeek is required for weekly_specific_days",
        },
      },
      timesPerWeek: {
        type: Number,
        min: 1,
        max: 7,
        validate: {
          validator: function (this: any, value: number) {
            if (this.type === "weekly_times") {
              return typeof value === "number";
            }
            return true;
          },
          message: "timesPerWeek is required for weekly_times",
        },
      },
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export const HabitModel = model<HabitDocument>("Habit", habitSchema);
