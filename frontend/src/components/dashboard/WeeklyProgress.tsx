"use client";
import { Card, Progress, Typography } from "antd";

const { Title, Text } = Typography;

const WeeklyProgress = () => {
  const completedHabits = 18;
  const totalHabits = 24;
  const percentage = Math.round((completedHabits / totalHabits) * 100);

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

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-12">
        <div className="flex-2">
          <Title
            level={4}
            className="!text-white !text-xl md:!text-2xl !m-0 mb-1"
          >
            Progreso Semanal
          </Title>
          <Text className="!text-emerald-50/90 !text-md md:!text-lg font-bold">
            ¡Vas por muy buen camino! Seguí así para cumplir tus objetivos.
          </Text>
        </div>

        <div className="flex-1 w-full">
          <Progress
            percent={percentage}
            strokeColor="#ffffff"
            railColor="rgba(255,255,255,0.2)"
            showInfo={false}
            stroke-width={10}
            className="m-0"
          />
          <div className="flex justify-end mt-1">
            <Text className="!text-white text-sm md:!text-lg font-bold">
              {completedHabits} / {totalHabits} hábitos
            </Text>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WeeklyProgress;
