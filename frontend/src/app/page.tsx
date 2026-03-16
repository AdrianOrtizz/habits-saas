import MainLayout from "@/components/layout/MainLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import WeeklyProgress from "@/components/dashboard/WeeklyProgess";

export default function HomePage() {
  return (
    <MainLayout>
      <DashboardHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-3 space-y-8">
          <WeeklyProgress />
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-layout shadow-sm border border-gray-100">
            <p>Próximamente: Resumen Semanal</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
