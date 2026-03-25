"use client";
import HabitItem from "./HabitItem";

import { DashboardHabit } from "@/types/habits.types";

const HabitList = ({ habits }: { habits: DashboardHabit[] }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-layout shadow-sm overflow-hidden">
      <div className="divide-y divide-gray-50">
        {habits.map((habit) => (
          <HabitItem key={habit.id} habit={habit} />
        ))}
      </div>

      <div className="bg-gray-50/50 p-3 text-center">
        <button className="text-primary text-xs font-semibold hover:underline">
          Gestionar hábitos
        </button>
      </div>
    </div>
  );
};

export default HabitList;
