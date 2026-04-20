"use client";
import { Card, Typography, Flex, Progress, Tag } from "antd";

const { Title, Text } = Typography;

import { getDaysLeftInWeek } from "@/utils/getLeftDays";

const SummaryCard = ({
  title,
  value,
  description,
  extra,
  className = "",
}: any) => (
  <Card
    className={`bg-white border-gray-100 shadow-sm rounded-layout flex-1 ${className}`}
    styles={{ body: { padding: "20px" } }}
  >
    <Flex vertical gap={8}>
      <Text
        type="secondary"
        className="text-xs uppercase tracking-wider font-medium text-gray-400"
      >
        {title}
      </Text>

      {typeof value === "string" && value.endsWith("%") ? (
        <Flex align="baseline" gap={4}>
          <Title
            level={2}
            className="!m-0 !leading-none font-extrabold text-gray-900"
          >
            {value}
          </Title>
        </Flex>
      ) : (
        <Title
          level={2}
          className="!m-0 !leading-tight font-extrabold text-gray-900"
        >
          {value}
        </Title>
      )}

      {description && (
        <Text type="secondary" className="text-xs text-gray-500 mt-1">
          {description}
        </Text>
      )}

      {extra && <div className="mt-2 w-full">{extra}</div>}
    </Flex>
  </Card>
);

const TimeRemainingCard = () => {
  const daysLeft = getDaysLeftInWeek();

  return (
    <Card className="flex flex-col h-full justify-between">
      <div>
        <h3 className="text-gray-400 text-sm font-medium mt-1">
          TIEMPO RESTANTE
        </h3>
      </div>

      <div className="flex items-baseline gap-2 my-2">
        <Title
          level={2}
          className="!m-0 !leading-none font-extrabold text-gray-900"
        >
          {daysLeft}
        </Title>
        {daysLeft !== "Último día" && (
          <span className="text-gray-400 font-medium">restantes</span>
        )}
      </div>

      <p className="text-[11px] text-gray-400 mt-2">
        Los objetivos se reinician el lunes a las 00:00.
      </p>
    </Card>
  );
};

const GoalsSummary = ({
  summary,
}: {
  summary?: {
    total: number;
    percentage: number;
    completed: number;
  };
}) => {
  return (
    <div className="mb-10">
      {!!summary ? (
        <div>
          <Flex
            justify="space-between"
            align="center"
            className="mb-5 flex-wrap gap-3"
          >
            <Tag
              color="warning"
              className="!bg-amber-100 !text-amber-700 !border-none !rounded-full !px-4 !py-1 !text-xs !font-semibold"
            >
              {summary?.completed} de {summary?.total} completados
            </Tag>
          </Flex>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SummaryCard
              title="Completados"
              value={`${summary?.percentage || 0}%`}
              description="Tu progreso en la semana"
              extra={
                <Progress
                  percent={summary?.percentage}
                  strokeColor="#63d392"
                  showInfo={false}
                  className="m-0"
                />
              }
            />

            <TimeRemainingCard />
          </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default GoalsSummary;
