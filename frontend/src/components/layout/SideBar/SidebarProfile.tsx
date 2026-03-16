import { Avatar, Typography } from "antd";

const { Text } = Typography;

export const SidebarProfile = () => {
  return (
    <div className="flex items-center gap-3 p-4 border-t border-gray-100 mt-auto">
      <Avatar
        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Adrian"
        size="large"
      />
      <div className="flex flex-col">
        <Text strong className="text-sm">
          Adrian
        </Text>
      </div>
    </div>
  );
};
