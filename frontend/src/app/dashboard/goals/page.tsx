"use client";
import GoalsHeader from "@/components/goals/GoalsHeader";
import GoalsSummary from "@/components/goals/GoalsSummary";
import GoalList from "@/components/goals/GoalsList";
import CreateGoalModal from "@/components/modals/CreateGoalModal";

import { useGoals } from "@/hooks/useGoals";

import { useState } from "react";

export default function GoalsPage() {
  const { data, isLoading } = useGoals();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-10">
      {!!data && !isLoading && (
        <div>
          <GoalsHeader setIsModalOpen={setIsModalOpen} />
          <GoalsSummary summary={data?.summary} />
          <GoalList data={data?.goals} isLoading={isLoading} />

          <CreateGoalModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      )}
    </div>
  );
}
