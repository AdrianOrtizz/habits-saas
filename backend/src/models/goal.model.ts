import { Schema, model, Types } from "mongoose";

export interface GoalDocument {
  userId: Types.ObjectId;
  name: string;
  icon: string;
  weekKey: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  expireAt: Date;
}

const GoalSchema = new Schema<GoalDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
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
    weekKey: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    expireAt: {
      type: Date,
      default: () => new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      index: { expires: 0 },
    },
  },
  {
    timestamps: true,
  },
);

GoalSchema.index({ userId: 1, weekKey: 1 });

export const GoalModel = model<GoalDocument>("Goal", GoalSchema);
