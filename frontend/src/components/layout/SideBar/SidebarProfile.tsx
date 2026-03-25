import { Avatar, Typography, Button } from "antd";
const { Text } = Typography;

import { LogOut } from "lucide-react";

import { useAuth } from "@/providers/AuthProvider";

export const SidebarProfile = () => {
  const { logout } = useAuth();

  return (
    <div className="flex items-center gap-3 p-4 border-t border-gray-100 mt-auto">
      <Avatar
        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Adrian"
        size="large"
      />
      <div className="flex w-full items-center">
        <Text strong className="mr-2">
          Adrian
        </Text>
        <Button type="link" onClick={() => logout()}>
          <LogOut size={16} />
        </Button>
      </div>
    </div>
  );
};
