"use client";
import { Card, Progress, Typography, Skeleton } from "antd";
const { Title, Text } = Typography;

import { HabitSummary } from "@/types/habits.types";

const WeeklyProgress = ({
  summary,
  isLoading,
}: {
  summary: HabitSummary;
  isLoading: boolean;
}) => {
  return (
    <Card
      className="shadow-lg shadow-emerald-100 border-none relative overflow-hidden"
      styles={{
        body: {
          padding: "24px",
          background: "var(--color-primary)",
          borderRadius: "var(--radius-layout)",
        },
      }}
    >
      <div className="absolute top-[-40px] right-[-20px] w-48 h-48 bg-white/10 rounded-full blur-2xl z-0" />

      {isLoading ? (
        <Skeleton active />
      ) : (
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-12">
          <div className="flex-2">
            <Title
              level={4}
              className="!text-white !text-xl md:!text-3xl !font-bold !m-0 mb-1"
            >
              Progreso Semanal
            </Title>
            <Text className="!text-emerald-50/90 !text-md md:!text-lg font-bold">
              ¡Vas por muy buen camino! Seguí así para cumplir tus objetivos.
            </Text>
          </div>
          <div className="flex-1 w-full">
            <Progress
              percent={summary?.progressPercentage}
              strokeColor="#ffffff"
              railColor="rgba(255,255,255,0.2)"
              showInfo={false}
              className="m-0"
            />
            <div className="flex justify-end mt-1">
              <Text className="!text-white text-sm md:!text-lg font-bold">
                {summary?.completedSteps} / {summary?.totalSteps} hábitos
              </Text>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default WeeklyProgress;
