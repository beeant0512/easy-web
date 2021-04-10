import request from '@/utils/request';

/**
 * 是否已经登录
 * @returns {Promise<*>}
 */
export async function isLogin() {
  return request('/api/authroity/status');
}

/**
 * 菜单
 * @returns {Promise<*>}
 */
export async function menus() {
  return request('/api/authroity/menus');
}

/**
 * 菜单
 * @returns {Promise<*>}
 */
export async function login(params) {
  return request('/api/login', {
    method: 'POST',
    data: params,
  });
}
