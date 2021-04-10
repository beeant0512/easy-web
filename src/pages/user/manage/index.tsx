import React, { useState } from 'react';
import ProTable from '@xstudio/pro-table';
import { connect } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import {
  message,
  Popconfirm,
  Button,
  Card,
} from 'antd';
import ManageForm from '@/components/ModelContainer';
import { add, update } from './service';
import { width } from '@/utils/styles';

const { action: actionWidth } = width;

const User = (props: { user: { data: any }; dispatch: any; loading: any }) => {
  const {
    user: { data },
    dispatch,
    loading,
  } = props;

  const [manageFormValues, setManageFormValues] = useState({});
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [timestamp, setTimeStamp] = useState('0');

  const handleManage = async (fields: any) => {
    // 主键存在 更新
    let status = false;
    if (manageFormValues.id) {
      const hide = message.loading('正在更新');
      try {
        await update({ ...fields, id: manageFormValues.id }).then((res) => {
          if (res.success) {
            hide();
            message.success('更新成功');
            status = true;
          } else {
            message.error(res.msg);
            status = false;
          }
        });
        return status;
      } catch (error) {
        hide();
        message.error('更新失败请重试！');
        return status;
      }
    } else {
      const hide = message.loading('正在添加');
      try {
        await add({ ...fields }).then((response) => {
          if (response.success) {
            hide();
            message.success('更新成功');
            status = true;
          } else {
            message.error(response.msg);
            status = false;
          }
        });
        return status;
      } catch (error) {
        hide();
        message.error('添加失败请重试！');
        return status;
      }
    }
  };

  const reload = () => {
    setTimeStamp(`${parseInt(String(new Date().getTime() / 1000), 10)}`);
  };

  const deleteRecord = (record: React.SetStateAction<{}>) => {
    dispatch({
      type: 'user/remove',
      payload: {
        id: record.id,
      },
      callback: (response: { success: boolean }) => {
        if (response.success) {
          reload();
        }
      },
    });
  };

  const columns = [
    {
      title: '操作',
      width: actionWidth * 2,
      valueType: 'option',
      render: (_: any, record: React.SetStateAction<{}>) => [
        <a
          onClick={() => {
            setManageFormValues(record);
            setUpdateModalVisible(true);
          }}
        >
          编辑
        </a>,
        <Popconfirm title="确认删除吗?" onConfirm={() => deleteRecord(record)}>
          <a href="#">删除</a>
        </Popconfirm>,
      ],
    },
    {
      title: '用户ID',
      dataIndex: 'id',
    },
    {
      title: '登录账号名',
      dataIndex: 'account',
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
    },
    {
      title: '邮件',
      dataIndex: 'email',
    },
    {
      title: '状态',
      dataIndex: 'invalid',
      valueEnum: {
        0: "正常",
        1: "已禁用"
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
    },
  ];

  return (
    <Card>
        <ProTable
          rowKey="id"
          reload={timestamp}
          loading={loading}
          data={data}
          columns={columns}
          fetch={(
            page: { current: any; pageSize: any },
            sorter: any,
            filter: any,
          ) => {
            dispatch({
              type: 'user/fetch',
              payload: {
                currentPage: page.current,
                pageSize: page.pageSize,
                ...filter,
                sorter,
              },
              callback: (res: {
                success: boolean;
                code: number;
                msg: string;
              }) => {
                if (!res.success && res.code !== 1) {
                  message.error(res.msg);
                }
              },
            });
          }}
          toolBarRender={() => [
            <Button type="primary" onClick={() => setAddModalVisible(true)}>
              <PlusOutlined />
              新建
            </Button>,
          ]}
        />
        {addModalVisible && (
          <ManageForm
            title="新增"
            onCancel={() => setAddModalVisible(false)}
            modalVisible={addModalVisible}
          >
            <ProTable
              onSubmit={async (value: any) => {
                const success = await handleManage(value);
                if (success) {
                  setManageFormValues({});
                  setAddModalVisible(false);
                  reload();
                }
              }}
              rowKey="id"
              type="form"
              columns={columns}
            />
          </ManageForm>
        )}
        {updateModalVisible && (
          <ManageForm
            title="编辑"
            update
            onCancel={() => setUpdateModalVisible(false)}
            modalVisible={updateModalVisible}
          >
            <ProTable
              onSubmit={async (value: any) => {
                const success = await handleManage(value);
                if (success) {
                  setManageFormValues({});
                  setUpdateModalVisible(false);
                  reload();
                }
              }}
              form={{
                initialValues: manageFormValues,
                labelCol: { span: 10 },
              }}
              rowKey="id"
              type="form"
              columns={columns}
            />
          </ManageForm>
        )}
      </Card>
  );
};

// @ts-ignore
export default connect(({ user, loading }) => ({
  user,
  submitting: loading.effects['user/add'] || loading.effects['user/update'],
  loading: loading.effects['user/fetch'],
}))(User);
