import { Schema, model, Types } from "mongoose";

export type HabitFrequency =
  | { type: "daily"; timesPerWeek: number }
  | { type: "weekly_specific_days"; daysOfWeek: number[]; timesPerWeek: number }
  | { type: "weekly_times"; timesPerWeek: number };

export interface HabitDocument {
  name: string;
  frequency: HabitFrequency;
  icon: string;
  userId: Types.ObjectId;
  createdAt: Date;
  isActive: boolean;
}

const habitSchema = new Schema<HabitDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    icon: {
      type: String,
      required: true,
      trim: true,
    },

    frequency: {
      type: {
        type: String,
        enum: ["daily", "weekly_specific_days", "weekly_times"],
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
      },
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true },
);

habitSchema.index({ userId: 1, isActive: 1 });

habitSchema.pre("validate", function () {
  if (this.frequency.type === "weekly_specific_days") {
    if (this.frequency.daysOfWeek) {
      this.frequency.timesPerWeek = this.frequency.daysOfWeek.length;
    }
  } else if (this.frequency.type === "daily") {
    this.frequency.timesPerWeek = 7;
  }
});

export const HabitModel = model<HabitDocument>("Habit", habitSchema);
