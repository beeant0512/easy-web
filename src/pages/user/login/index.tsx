import React, { useState } from 'react';
import { Row, Col } from 'antd';
import ProForm, { ProFormText, ProFormCaptcha } from '@ant-design/pro-form';
import { MobileTwoTone, MailTwoTone } from '@ant-design/icons';
import { sendCaptcha, getCaptchaStatus } from './model';
import { login } from '@/services/authroity';

export default function Page() {
  const [countDown, setCountDown] = useState(60);

  const getCountDown = async (value: String) => {
    const response = await getCaptchaStatus({ phone: value });
    setCountDown(response.data);
  };

  return (
    <Row justify="center" align="middle">
      <Col xs={24} sm={12} md={6} xxl={4}>
        <ProForm
          onFinish={async (values) => {
            const response = await login(values);
            console.log(response);
          }}
          submitter={{
            searchConfig: {
              submitText: '登录',
            },
            render: (_, dom) => dom.pop(),
            submitButtonProps: {
              size: 'large',
              style: {
                width: '100%',
              },
            },
          }}
        >
          <h1
            style={{
              textAlign: 'center',
            }}
          >
            <img
              style={{
                height: '44px',
                marginRight: 16,
              }}
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
            />
            Ant Design
          </h1>
          <div
            style={{
              marginTop: 12,
              textAlign: 'center',
              marginBottom: 40,
            }}
          >
            低代码中后台系统
          </div>
          <ProFormText
            fieldProps={{
              size: 'large',
              prefix: <MobileTwoTone />,
              onChange: (e) => {
                getCountDown(e.target.value);
              },
            }}
            name="phone"
            placeholder="请输入手机号"
            rules={[
              {
                required: true,
                message: '请输入手机号!',
              },
              {
                pattern: /^1\d{10}$/,
                message: '不合法的手机号格式!',
              },
            ]}
          />
          <ProFormCaptcha
            disabled={countDown > 0}
            fieldProps={{
              size: 'large',
              prefix: <MailTwoTone />,
            }}
            captchaProps={{
              size: 'large',
            }}
            phoneName="phone"
            name="captcha"
            rules={[
              {
                required: true,
                message: '请输入验证码',
              },
            ]}
            placeholder="请输入验证码"
            onGetCaptcha={async (phone) => {
              const response = await sendCaptcha({ phone });
              if (response.success === false) {
                throw new Error('获取验证码错误');
              }
            }}
          />
        </ProForm>
      </Col>
    </Row>
  );
}
