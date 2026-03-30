"use client";
import GoalsHeader from "@/components/goals/GoalsHeader";
import GoalsSummary from "@/components/goals/GoalsSummary";
import GoalList from "@/components/goals/GoalsList";
import CreateGoalModal from "@/components/modals/CreateGoalModal";

import { useState } from "react";

export default function GoalsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="space-y-10">
      <GoalsHeader setIsModalOpen={setIsModalOpen} />
      <GoalsSummary />
      <GoalList />

      <CreateGoalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
