"use client";

import HabitItem from "./HabitItem";
import ManageHabitsModal from "@/components/modals/ManageHabitsModal";

import { Button } from "antd";

import { DashboardHabit } from "@/types/habits.types";

import { useState } from "react";

const HabitList = ({ habits }: { habits: DashboardHabit[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-white border border-gray-100 rounded-layout shadow-sm overflow-hidden">
      <div className="divide-y divide-gray-50">
        {habits?.map((habit) => (
          <HabitItem key={habit.id} habit={habit} />
        ))}
      </div>

      <div className="bg-gray-50/50 p-3 text-center">
        <Button
          onClick={() => setIsModalOpen(true)}
          type="link"
          className="!text-primary"
        >
          Gestionar hábitos
        </Button>
      </div>

      <ManageHabitsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        habits={habits}
      />
    </div>
  );
};

export default HabitList;
