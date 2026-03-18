import MainLayout from "@/components/layout/MainLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import WeeklyProgress from "@/components/dashboard/WeeklyProgress";
import DaysSelector from "@/components/dashboard/DaysSelector";
import HabitList from "@/components/dashboard/habitList/HabitList";

export default function HomePage() {
  return (
    <MainLayout>
      <DashboardHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-3 space-y-8">
          <WeeklyProgress />
        </div>
        <div className="col-span-2">
          <DaysSelector />
          <HabitList />
        </div>
      </div>
    </MainLayout>
  );
}
