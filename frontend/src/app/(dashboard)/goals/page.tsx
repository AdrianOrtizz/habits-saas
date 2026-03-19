import GoalsHeader from "@/components/goals/GoalsHeader";
import GoalsSummary from "@/components/goals/GoalsSummary";
import GoalList from "@/components/goals/GoalsList";

export default function GoalsPage() {
  return (
    <div className="space-y-10">
      <GoalsHeader />
      <GoalsSummary />
      <GoalList />
    </div>
  );
}
