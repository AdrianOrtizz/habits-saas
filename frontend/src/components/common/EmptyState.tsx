import { Empty, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText?: string;
  onAction?: () => void;
  imageType?: "simple" | "default";
}

const EmptyState = ({
  title,
  description,
  buttonText,
  onAction,
  imageType = "simple",
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-10 bg-gray-50/50 border-2 border-dashed border-gray-200 rounded-2xl transition-all hover:border-blue-200 group">
      <Empty
        image={
          imageType === "simple"
            ? Empty.PRESENTED_IMAGE_SIMPLE
            : Empty.PRESENTED_IMAGE_DEFAULT
        }
        description={
          <div className="flex flex-col gap-1">
            <span className="text-lg font-semibold text-gray-800">{title}</span>
            <span className="text-gray-500 max-w-[250px] mx-auto">
              {description}
            </span>
          </div>
        }
      >
        {onAction && buttonText && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={onAction}
            className="h-10 px-6 rounded-full bg-blue-600 hover:bg-blue-500 shadow-md transition-all active:scale-95"
          >
            {buttonText}
          </Button>
        )}
      </Empty>
    </div>
  );
};

export default EmptyState;
