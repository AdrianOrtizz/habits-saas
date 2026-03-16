"use client";
import { Card, Progress, Typography } from "antd";

const { Title, Text } = Typography;

const WeeklyProgress = () => {
  return (
    <Card
      className="!bg-primary border-none shadow-lg shadow-emerald-100 overflow-hidden relative"
      body-style={{ padding: "24px" }}
    >
      <div className="absolute top-[-20px] right-[-20px] w-40 h-40 bg-white/10 rounded-full blur-2xl" />

      <div className="relative z-10">
        <Title level={4} className="!text-white !m-0 mb-1">
          Progreso Semanal
        </Title>
        <Text className="text-emerald-50/90 block mb-6">
          ¡Vas por muy buen camino! Seguí así para cumplir tus objetivos.
        </Text>

        <div className="">
          <div className="flex justify-between items-end mb-2">
            <Text className="text-white text-sm font-medium">
              Objetivo semanal: 75%
            </Text>
            <Text className="text-white text-2xl font-bold">18/24</Text>
          </div>
          <Progress
            percent={75}
            strokeColor="#ffffff"
            trail-color="rgba(255,255,255,0.2)"
            showInfo={false}
            strokeWidth={12}
          />
        </div>
      </div>
    </Card>
  );
};

export default WeeklyProgress;
