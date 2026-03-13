import { Types } from "mongoose";

export interface GoalCreate {
  userId: Types.ObjectId;
  name: string;
  weekKey: string;
}
