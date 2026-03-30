"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import WeeklyProgress from "@/components/dashboard/WeeklyProgress";
import DaysSelector from "@/components/dashboard/DaysSelector";
import HabitList from "@/components/dashboard/habitList/HabitList";

import { useState } from "react";
import CreateHabitModal from "@/components/modals/CreateHabitModal";

import { useDashboard } from "@/hooks/useDashboard";

export default function HomePage() {
  const { data, isLoading } = useDashboard();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <DashboardHeader setIsModalOpen={setIsModalOpen} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-3 space-y-8">
          <WeeklyProgress summary={data?.summary} isLoading={isLoading} />
        </div>
        <div className="col-span-2">
          <DaysSelector />
          <HabitList habits={data?.habits} openModal={setIsModalOpen} />

          <CreateHabitModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}
