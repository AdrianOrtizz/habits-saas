"use client";
import { Typography } from "antd";

const { Text } = Typography;

import { getCurrentWeek } from "@/utils/getCurrentWeek";

const DaysSelector = ({ bestStreak }: { bestStreak: number }) => {
  const weekDays = getCurrentWeek();

  return (
    <div className="mb-6 w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800 m-0">
          Tus Hábitos Diarios
        </h3>
        {bestStreak > 0 && (
          <div className="bg-amber-100 px-3 py-1 rounded-full flex items-center gap-1">
            <Text className="text-amber-600 text-xs font-semibold">
              🔥 Tu mejor racha es de {bestStreak} día
              {bestStreak > 1 ? "s" : ""}
            </Text>
          </div>
        )}
      </div>

      <div
        className="overflow-x-auto pb-2 snap-x w-full
                      [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <div className="grid grid-cols-7 gap-1 md:gap-3 w-full min-w-[500px] md:min-w-0 snap-x">
          {weekDays.map((day, index) => (
            <button
              key={index}
              className={`
                snap-center flex flex-col items-center justify-center 
                w-full h-16 md:h-24 rounded-layout border transition-all
                ${
                  day.isToday
                    ? "bg-primary border-primary text-white shadow-md shadow-emerald-100"
                    : "bg-white border-gray-100 text-gray-400 hover:border-primary/50"
                }
              `}
            >
              <Text
                className={`text-[10px] md:!text-sm font-medium ${day.isToday ? "!text-white/90" : "!text-gray-400"}`}
              >
                {day.dayName}
              </Text>
              <Text
                className={`text-base md:!text-2xl font-bold mt-1 ${day.isToday ? "!text-white" : "!text-gray-400"}`}
              >
                {day.dayNumber}
              </Text>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DaysSelector;
