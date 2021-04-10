import request from '@/utils/request';
import { stringify } from 'qs';

/**
 * 查询所有
 * @param params
 * @returns {Promise<*>}
 */
export async function query(params) {
  return request(`/api/user?${stringify(params)}`);
}

/**
 * 获取详情
 * @param id
 * @returns {Promise<*>}
 */
export async function get(id) {
  return request(`/api/user/${id}`);
}

/**
 * 移除
 * @param id
 * @returns {Promise<*>}
 */
export async function remove(id) {
  return request(`/api/user/${id}`, {
    method: 'DELETE',
  });
}

/**
 * 添加
 * @param params
 * @returns {Promise<*>}
 */
export async function add(params) {
  return request(`/api/user`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 更新
 * @param params
 * @returns {Promise<*>}
 */
export async function update(params) {
  return request(`/api/user/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

/**
 * 校验
 * @param params
 * @returns {Promise<*>}
 */
export async function validate(params) {
  return request(`/api/user/validate`, {
    method: 'POST',
    data: params,
  });
}
