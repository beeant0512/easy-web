export default [
  {
    path: '/login',
    component: '../layouts/UserLayout',
    routes: [{ path: '/login', component: '@/pages/user/login' }],
  },
  {
    path: '/',
    component: '../layouts/AdminLayout',
    routes: [
      { path: '/', redirect: '/welcome' },
      {
        path: '/welcome',
        component: '@/pages/index',
      },
      {
        path: '/user',
        component: '@/pages/user/manage/index',
      },
    ],
  },
];
