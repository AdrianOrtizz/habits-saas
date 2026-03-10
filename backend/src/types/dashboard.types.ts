import { HabitFrequency } from "../models/habit.model";

export type StepStatus = "done" | "pending" | "missed";

export type HabitStep = {
  status: StepStatus;
  label?: string;
};

export type Context = {
  todayISO: string;
  currentWeekKey: string;
  weekDates: Date[];
  weekStart: Date;
  weekEnd: Date;
};

export type DashboardHabit = {
  _id: string;
  name: string;
  frequency: HabitFrequency;
  streak: number;
  progress: {
    completed: number;
    target: number;
  };
  steps: HabitStep[];
};

// {
//       "id": "69b039d81696152ac3c80701",
//       "name": "a",
//       "frequency": {
//         "type": "weekly_specific_days",
//         "daysOfWeek": [
//           0,
//           1,
//           2
//         ],
//         "timesPerWeek": 3
//       },
//       "streak": 0,
//       "progress": {
//         "completed": 1,
//         "target": 3
//       },
//       "steps": [
//         {
//           "status": "missed",
//           "label": "Lun"
//         },
//         {
//           "status": "done",
//           "label": "Mar"
//         },
//         {
//           "status": "pending",
//           "label": "Mié"
//         }
//       ]
//     }
