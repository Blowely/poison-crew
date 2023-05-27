import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

export const AppLoading = () => (
  <div style={{
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%'
  }}>
    <Spin indicator={<LoadingOutlined style={{fontSize: '24px'}} spin />} />
  </div>
)