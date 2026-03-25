import { Spin } from "antd";

const Loading = () => {
  return (
    <Spin
      styles={{ indicator: { color: "#6fcf97" } }}
      size="large"
      fullscreen
    />
  );
};

export default Loading;
