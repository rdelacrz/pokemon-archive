import { FC } from 'react';
import { Sidebar } from 'primereact/sidebar';

import './styles.scss';

interface LoginSidePanelProps {
  visible?: boolean;
  setVisible: (visible: boolean) => void;
}

export const LoginSidePanel: FC<LoginSidePanelProps> = ({ visible, setVisible }) => {
  return (
    <Sidebar
      visible={visible}
      position='right'
      onHide={() => setVisible(false)}
    >
      Login Form Here
    </Sidebar>
  );
}

export default LoginSidePanel;