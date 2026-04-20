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
  id: string;
  name: string;
  icon: string;
  frequency: HabitFrequency;
  isCompletedToday: boolean;
  isCompletedThisWeek: boolean;
  streak: number;
  progress: {
    completed: number;
    target: number;
  };
  steps: HabitStep[];
};

export interface ICreateHabit {
  name: string;
  icon: string;
  frequency: HabitFrequency;
}

export interface IUpdateHabit {
  name?: string;
  icon?: string;
}

export interface HabitSummary {
  totalSteps: number;
  completedSteps: number;
  progressPercentage: number;
  bestStreak: number;
}

export interface HabitWeek {
  start: string;
  end: string;
}

export interface HabitResponse {
  habits: DashboardHabit[];

  summary: HabitSummary;
}
