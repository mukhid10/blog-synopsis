import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, notification, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CustomModal } from '../component/modal';
import { ModalAction } from '../component/modalAction';
import { DeleteOutlined, EditOutlined, ExportOutlined, FileAddOutlined } from '@ant-design/icons';
import Link from 'next/link';


interface Column {
  title: string;
  dataIndex: string;
  key: string;
  width?: string;
  render?: (value: any, record: any, index: number) => React.ReactNode;
}

function Beranda() {
    const [mark, setMark] = useState<boolean>(false);
    const [modalEdit, setModalEdit] = useState<boolean>(false);
    const [modalConfirmationDelete, setModalConfirmationDelete] = useState<boolean>(false);
    const [modalAddData, setModalAddData] = useState<boolean>(false);

    const [id, setId] = useState<number>();
    const [initData, setInitData] = useState<object>({
        title: '',
        body: '',
        user_id: null
    });

    // Hanle Get Data
    const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['getPostsPage'],
    queryFn: async () => {  
        const { data } = await axios.get(`https://gorest.co.in/public/v2/posts`, {
            headers: {
            "Authorization": process.env.NEXT_PUBLIC_TOKEN
            },
        });
        
        return data;
        }
    });

    const { isLoading: isLoadingUserById, error: errorUserById, data: dataUserById } = useQuery({
        queryKey: ['getByIdUser', id],
        queryFn: async () => {
          if (id) {   
            const { data } = await axios.get(`https://gorest.co.in/public/v2/posts/${id}`, {
              headers: {
                "Authorization": process.env.NEXT_PUBLIC_TOKEN
              }
            });
            
            return data;
          }
        },
      });


    // Handle Delete Data
    const { mutate: deleteUser, isSuccess, isError } = useMutation(
    {
      mutationFn: async () => {
        const response = await axios.delete(`https://gorest.co.in/public/v2/posts/${id}`, {
            headers: {
              "Authorization": process.env.NEXT_PUBLIC_TOKEN
            }
          });
        return response.data;
      },
      onSuccess: () => {
        notification.success({
            message: 'Delete success',
            description: 'Data has been successfully deleted.',
        });
        refetch()
        setModalConfirmationDelete(false);
      },
      onError: () => {
        notification.error({
            message: 'Delete failed',
            description: 'Failed to delete data, please try again',
        });
        setModalConfirmationDelete(false);
      },
    },
    );

    useEffect(() => {
        if (dataUserById?.title) {
            handleInitData();
        }
    }, [dataUserById, mark]);

    const handleInitData = ()=>{
        setInitData({
            ...initData,
            title: dataUserById?.title,
            body: dataUserById?.body,
            user_id: dataUserById?.user_id.toString()
        })        
    }  

    const handleDelete = () => {
    deleteUser();
    };

    // handle Update blog
    const updateBlog = useMutation({
        mutationFn: async (updateData: any) => {
            try {
                const { data } = await axios.patch(`https://gorest.co.in/public/v2/posts/${id}`, updateData, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": process.env.NEXT_PUBLIC_TOKEN
                    }
                });

                return data;
            } catch (error) {
                throw new Error('Gagal mengupdate pengguna');
            }
        },
        onSuccess: (data) => {
            notification.success({
                message: 'Update success',
                description: 'Data has been updated successfully.',
            });
            setModalEdit(false)
            refetch()
            setInitData({
                ...initData,
                title: '',
                body: '',
                user_id: null
            })
        },
        onError: (error) => {
            notification.error({
                message: 'Update failed',
                description: error.message,
            });
        }
    });

    const handleSubmitEdit = () => {    
        updateBlog.mutate(initData);
    };


    // handle add blog
    const addBlog = useMutation({
        mutationFn: async (addData: any) => {
            try {
                const { data } = await axios.post(`https://gorest.co.in/public/v2/posts`, addData, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": process.env.NEXT_PUBLIC_TOKEN
                    }
                });

                return data;
            } catch (error) {
                throw new Error('Gagal mengupdate pengguna');
            }
        },
        onSuccess: (data) => {
            notification.success({
                message: 'Add blog success',
                description: 'Data blog has been updated successfully.',
            });
            setModalAddData(false)
            refetch()
            setInitData({
                ...initData,
                title: '',
                body: '',
                user_id: null
            })
        },
        onError: (error) => {
            notification.error({
                message: 'Add blog failed',
                description: error.message,
            });
        }
    });

    const handleSubmitAdd = () => {    
        addBlog.mutate(initData);
    };


    const columns: Column[] = [
        {
            title: 'Title',
            dataIndex: 'title',
            width: '20%',
            key: 'title',
        },
        {
            title: 'Body',
            dataIndex: 'body',
            key: 'body',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'action',
            width: '15%',
            render: (text: string, record: any) => (
                <span className='flex justify-between'>
                    <Link href={`/screen/blog/${record.id}`} className='cursor-pointer hover:text-yellow-500 flex'
                    ><ExportOutlined /><span className='hidden lg:flex md:flex'>Detail</span> </Link><span className='hidden lg:flex md:flex mx-1'>|</span>
                    <span className='cursor-pointer hover:text-yellow-500 flex'
                    onClick={()=>{
                    setId(record.id)
                    setModalEdit(true)
                    setMark(!mark)
                    }}> <EditOutlined /><span className='hidden lg:flex md:flex'>Edit</span></span> <span className='hidden lg:flex md:flex mx-1'>|</span>
                    <span className='cursor-pointer hover:text-yellow-500 flex'
                    onClick={()=>{
                    setId(record.id)
                    setModalConfirmationDelete(true)
                    }}> <DeleteOutlined /><span className='hidden lg:flex md:flex'>Delete</span></span>
                </span>
            ),
        },
    ];
    
  return (
    <>
        <div className='p-2 lg:p-10 md:p-5 h-full overflow-visible w-full'>
            <div className='flex justify-between mb-5'>
                <div className='font-bold text-4xl italic text-gray-900'>List Blog</div>
                <Button
                    className="w-auto h-10 text-gray-700 flex justify-center items-center border border-transparent text-sm font-medium rounded-md bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:border-yellow-600 focus:shadow-outline-indigo active:bg-yellow-500 transition duration-150 ease-in-out"
                    onClick={()=>setModalAddData(true)}
                ><FileAddOutlined /> Add Blog</Button>
            </div>
            <Table 
                dataSource={data} 
                columns={columns}
                pagination={{ pageSize: 5 }}
                // scroll={{ y: 100 * 5 }}
                bordered
            />
        </div>
    
        {/* modal confirmation delete */}
        <CustomModal isModalOpen={modalConfirmationDelete} setIsModalOpen={setModalConfirmationDelete} 
        title='Confirmation' desc='Are you sure you want to delete this data?'
        action={()=>handleDelete()}
        />
    
        {/* Modal edit data */}
        <ModalAction isModalOpen={modalEdit} setIsModalOpen={setModalEdit} 
        title='Edit Data' initData={initData} setInitData={setInitData}
        action={()=>handleSubmitEdit()}/>

        {/* Modal add data */}
        <ModalAction isModalOpen={modalAddData} setIsModalOpen={setModalAddData} 
        title='Add Data' initData={initData} setInitData={setInitData}
        action={()=>handleSubmitAdd()}/>
    </>
  )
}

export default Beranda