import request from '@/utils/request';
import { stringify } from 'querystring';

/**
 * 发送验证码
 * @param params
 * @returns {Promise<*>}
 */
export async function sendCaptcha(params) {
  return request('/api/authroity/captcha', {
    method: 'POST',
    params: params,
    encrypt: 'params'
  });
}

/**
 * 获取验证码状态
 * @param params
 * @returns {Promise<*>}
 */
export async function getCaptchaStatus(params) {
  return request(`/api/authroity/captcha`, {
    params,
    encrypt: 'params'
  });
}
