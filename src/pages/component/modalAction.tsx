import { Input, Modal, Button } from 'antd';
import React from 'react';

interface ModalProps {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    action: any;
    initData: { title?: string; body?: string };
    setInitData: React.Dispatch<React.SetStateAction<{ title?: string; body?: string }>>;
  }
  
  const ModalAction: React.FC<ModalProps> = ({isModalOpen, setIsModalOpen, title, initData, setInitData, action}) => {
    const { TextArea } = Input;

    const handleOk = () => {
      action()
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
      setInitData({
        ...initData,
        title: '',
        body: '',
    })
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setInitData(prev => ({
          ...prev,
          [name]: value
      }));
  };
  
    return (
      <>
        <Modal title={title} open={isModalOpen} footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" className='bg-yellow-500' onClick={handleOk}>
            Submit
          </Button>,
        ]}>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="sm:rounded-lg">
                    <form>
                        <div>
                            <label className="block text-sm font-medium leading-5 text-gray-700">Title</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <Input 
                                    id="title" 
                                    name="title" 
                                    placeholder="input title" 
                                    type="text" 
                                    required
                                    value={initData?.title}
                                    onChange={handleChange}
                                    className="appearance-none text-gray-700 block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-yellow focus:border-yellow-500 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="block text-sm font-medium leading-5 text-gray-700">
                                Body
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                            <TextArea rows={4} 
                                id="body" 
                                name="body" 
                                placeholder="input body" 
                                required
                                value={initData?.body}
                                onChange={handleChange}
                                className="appearance-none text-gray-700 block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-yellow focus:border-yellow-500 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                            />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
      </>
    );
  };

  export default ModalAction;