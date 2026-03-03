import { Schema, model, Types } from "mongoose";

export interface CompletionDocument {
  habitId: Types.ObjectId;
  userId: Types.ObjectId;
  periodKey: string;
  createdAt: Date;
}

const completionSchema = new Schema<CompletionDocument>(
  {
    habitId: {
      type: Schema.Types.ObjectId,
      ref: "Habit",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    periodKey: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

completionSchema.index({ habitId: 1, periodKey: 1 }, { unique: true });
completionSchema.index({ userId: 1, periodKey: 1 });

export const CompletionModel = model<CompletionDocument>(
  "Completion",
  completionSchema,
);
