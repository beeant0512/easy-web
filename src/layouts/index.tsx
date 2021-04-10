import React, { useState } from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import type { ProSettings } from '@ant-design/pro-layout';
import defaultSettings from '../../config/defaultSettings';

import ProLayout, { SettingDrawer } from '@ant-design/pro-layout';

const layout = (props: any) => {
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    title: defaultSettings.title,
  });
  const [pathname, setPathname] = useState('/welcome');
  const { children } = props;

  return (
    <div
      id="main-content"
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        location={{
          pathname,
        }}
        menuFooterRender={false}
        onMenuHeaderClick={(e) => console.log(e)}
        menuItemRender={(item, dom) => (
          <a
            onClick={() => {
              setPathname(item.path || '/welcome');
            }}
          >
            {dom}
          </a>
        )}
        rightContentRender={() => (
          <div>
            <Avatar shape="square" size="small" icon={<UserOutlined />} />
          </div>
        )}
        {...settings}
      >
        {children}
      </ProLayout>
      <SettingDrawer
        pathname={pathname}
        getContainer={() => document.getElementById('main-content')}
        settings={settings}
        onSettingChange={(changeSetting) => setSetting(changeSetting)}
      />
    </div>
  );
};

export default layout;
