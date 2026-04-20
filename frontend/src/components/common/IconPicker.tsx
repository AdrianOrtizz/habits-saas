"use client";

import { HABIT_ICONS } from "@/utils/icons";
import { Tooltip } from "antd";

interface IconPickerProps {
  value?: string;
  onChange?: (iconName: string) => void;
}

const IconPicker = ({ value, onChange }: IconPickerProps) => {
  return (
    <div className="grid grid-cols-5 md:grid-cols-10 gap-4 justify-start p-1">
      {HABIT_ICONS.map((item) => {
        const Icon = item.icon;
        const isSelected = value === item.name;

        return (
          <Tooltip title={item.label} key={item.name}>
            <button
              type="button"
              onClick={() => onChange?.(item.name)}
              className={`
                w-10 h-10 flex items-center justify-center rounded-lg transition-all
                ${
                  isSelected
                    ? "bg-primary text-white shadow-md scale-110"
                    : "bg-gray-50 text-gray-400 hover:bg-emerald-50 hover:text-primary border border-transparent hover:border-primary/20"
                }
              `}
            >
              <Icon size={20} strokeWidth={isSelected ? 2.5 : 2} />
            </button>
          </Tooltip>
        );
      })}
    </div>
  );
};

export default IconPicker;
