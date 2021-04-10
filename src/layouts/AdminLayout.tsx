import React, { useEffect, useState } from 'react';
import ProLayout, {
  PageHeaderWrapper,
  PageLoading,
} from '@ant-design/pro-layout';
import type { MenuDataItem } from '@ant-design/pro-layout';
import { SmileOutlined, HeartOutlined } from '@ant-design/icons';
import { Redirect, connect, Link, history } from 'umi';
import { stringify } from 'querystring';
import RightContent from '@/components/RightContent';

const IconMap: any = {
  smile: <SmileOutlined />,
  heart: <HeartOutlined />,
};

const loopMenuItem = (menus: MenuDataItem[]): MenuDataItem[] =>
  menus.map(({ icon, children, ...item }) => ({
    ...item,
    icon: icon && IconMap[icon as string],
    children: children && loopMenuItem(children),
  }));

const AdminLayout = (props: {
  dispatch: any;
  settings: any;
  children: any;
  loading: boolean;
  isLogin: boolean;
  loadingMenu: boolean;
}) => {
  const { dispatch, children, settings, loading, isLogin, loadingMenu } = props;

  const [isReady, setIsReady] = useState(false);
  const [menuData, setMenuData] = useState<MenuDataItem[]>([]);

  useEffect(() => {
    setIsReady(true);

    if (dispatch) {
      dispatch({
        type: 'global/menus',
        callback: (response: { data: any }) => {
          setMenuData(response.data || []);
        },
      });
      dispatch({
        type: 'global/isLogin',
      });
    }
  }, []);

  // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
  const queryString = stringify({
    redirect: window.location.href,
  });

  if ((!isLogin && loading) || !isReady) {
    return <PageLoading tip="页面加载中" />;
  }

  if (!isLogin && window.location.pathname !== '/login') {
    return <Redirect to={`/login?${queryString}`} />;
  }

  return (
    <div
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        {...settings}
        {...props}
        onMenuHeaderClick={() => history.push('/')}
        menu={{
          loading: loadingMenu,
        }}
        location={{
          pathname: '/welcome',
        }}
        breadcrumbRender={(routers = []) => [
          {
            path: '/',
            breadcrumbName: '首页',
          },
          ...routers,
        ]}
        itemRender={(route, params, routes, paths) => {
          console.log(route);
          const first = routes.indexOf(route) === 0;
          return first ? (
            <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
          ) : (
            <span>{route.breadcrumbName}</span>
          );
        }}
        menuDataRender={() => loopMenuItem(menuData)}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl || !menuItemProps.path) {
            return defaultDom;
          }

          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        rightContentRender={() => <RightContent />}
      >
        <PageHeaderWrapper title={false}>{children}</PageHeaderWrapper>
      </ProLayout>
    </div>
  );
};

// @ts-ignore
export default connect(({ global, loading, settings }) => ({
  isLogin: global.isLogin,
  loading: loading.effects['global/isLogin'],
  loadingMenu: loading.effects['global/menus'],
  settings,
}))(AdminLayout);
