import { LoaderCircle } from "lucide-react";
import { Spin } from "antd";

const Loading = () => {
  return (
    <Spin
      spinning={true}
      styles={{ indicator: { color: "#6fcf97" } }}
      fullscreen
    />
  );
};

export default Loading;
