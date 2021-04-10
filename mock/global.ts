import mockjs from 'mockjs';

export default {
  'GET /api/authroity/menus': {
    data: [
      {
        path: '/',
        name: '首页',
        icon: 'smile',
      },
      {
        path: '/',
        name: '配置',
        icon: 'smile',
      },
      {
        path: '/user',
        name: '用户管理',
        icon: 'smile',
      },
    ],
  },
  'GET /api/authroity/status': mockjs.mock({
    data: true,
  }),
};
