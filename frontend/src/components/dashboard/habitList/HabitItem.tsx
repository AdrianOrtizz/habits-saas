"use client";
import { Check, Smile } from "lucide-react";
import { Typography, Tag } from "antd";

const { Text } = Typography;

const HabitItem = ({ habit }: { habit: any }) => {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group">
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors bg-emerald-50 text-primary">
          <Smile size={20} />
        </div>

        <div className="flex flex-col min-w-0">
          <Text
            strong
            className={`truncate text-sm md:text-base ${habit.completed ? "line-through text-gray-400 font-normal" : "text-gray-800"}`}
          >
            {habit.name}
          </Text>
          <div className="flex items-center gap-2">
            <Text
              type="secondary"
              className="text-[10px] md:text-xs flex items-center gap-1"
            >
              Progreso semanal: {habit.progress.completed} /{" "}
              {habit.progress.target}
            </Text>

            <Text
              type="secondary"
              className="text-[10px] md:text-xs flex items-center gap-1"
            >
              🔥 {habit.streak} días seguidos
            </Text>
          </div>
        </div>
      </div>

      <button
        className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all bg-primary border-primary text-white scale-110`}
      >
        <Check size={16} strokeWidth={3} className="block text-gray-200" />
      </button>
    </div>
  );
};

export default HabitItem;
