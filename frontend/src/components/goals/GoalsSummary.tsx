"use client";
import { Card, Typography, Flex, Progress, Tag } from "antd";

const { Title, Text } = Typography;

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
            level={1}
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

const GoalsSummary = () => {
  return (
    <div className="mb-10">
      <Flex
        justify="space-between"
        align="center"
        className="mb-5 flex-wrap gap-3"
      >
        <Flex vertical>
          <Text type="secondary" className="text-xs text-gray-400">
            Objetivos de la semana
          </Text>
          <Title
            level={3}
            className="!m-0 !leading-tight font-bold text-gray-800"
          >
            16/3 al 22/3
          </Title>
        </Flex>

        <Tag
          color="warning"
          className="!bg-amber-100 !text-amber-700 !border-none !rounded-full !px-4 !py-1 !text-xs !font-semibold"
        >
          3 de 6 completados
        </Tag>
      </Flex>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard
          title="Completados"
          value="50%"
          description="Vas por la mitad de tus objetivos."
          extra={
            <Progress
              percent={50}
              strokeColor="#63d392"
              showInfo={false}
              className="m-0"
            />
          }
        />

        <SummaryCard
          title="Prioridad alta"
          value="2"
          description="Dos objetivos necesitan foco esta semana."
          className="bg-emerald-50/40 border-emerald-100"
        />

        <SummaryCard
          title="Próximo paso"
          value="Gym"
          description="Solo falta 1 sesión para cerrarlo."
        />
      </div>
    </div>
  );
};

export default GoalsSummary;
