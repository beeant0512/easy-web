import mockjs from 'mockjs';

export default {
  'POST /api/authroity/captcha': mockjs.mock({
    'success|1': false,
    code: 0,
  }),
  'GET /api/authroity/captcha': mockjs.mock({
    success: true,
    'data|1-120': 50,
  }),
};
