import React from 'react';
import { Modal } from 'antd';

const ModalContainer = (props) => {
  return (
    <Modal {...props} footer={false}>
      {props.children}
    </Modal>
  );
};

export default ModalContainer;
