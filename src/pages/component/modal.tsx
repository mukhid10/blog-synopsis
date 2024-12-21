import React from 'react';
import { Button, Modal } from 'antd';

interface CustomModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  desc: string;
  action: () => void;
}

export const CustomModal: React.FC<CustomModalProps> = ({isModalOpen, setIsModalOpen, title, desc, action}) => {

  const handleOk = () => {
    action()
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
        <Modal title={title} open={isModalOpen} footer={[
          <Button key="back" onClick={handleCancel} className='hover:border-yellow-500 hover:text-yellow-500'>
            Cancel
          </Button>,
          <Button key="submit" type="primary" className='bg-yellow-500 hover:border-yellow-500' onClick={handleOk}>
            Submit
          </Button>,
        ]}>
        <p>{desc}</p>
        </Modal>
    </>
    );
};