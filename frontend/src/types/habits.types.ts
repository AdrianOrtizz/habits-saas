export type HabitFrequency =
  | { type: "daily"; timesPerWeek: number }
  | { type: "weekly_specific_days"; daysOfWeek: number[]; timesPerWeek: number }
  | { type: "weekly_times"; timesPerWeek: number };

export type StepStatus = "done" | "pending" | "missed";

export type HabitStep = {
  status: StepStatus;
  label?: string;
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

export interface CreateHabit {
  name: string;
  icon: string;
  frequency: HabitFrequency;
}
