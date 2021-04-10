import { extend } from 'umi-request';
import { notification } from 'antd';
import forge from 'node-forge';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/**
 * 异常处理程序
 */

const errorHandler = (error) => {
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
    return {};
  }

  return response;
};
/**
 * 配置request请求时的默认参数
 */

const request = extend({
  errorHandler,
  // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});


request.interceptors.request.use(
  async (url, options) => {
    if (url !== '/api/authroity/encrypt' && options.encrypt) {
      const encryptKey = await request.get('/api/authroity/encrypt');
      console.log(encryptKey);
      // load public key from PEM-formatted string
      const pubKey = `-----BEGIN PUBLIC KEY-----${encryptKey.data}-----END PUBLIC KEY-----`;

      const publicKey = forge.pki.publicKeyFromPem(pubKey);
      let buffer;

      const encrypt_field = options.encrypt;

      buffer = forge.util.createBuffer(JSON.stringify(options[encrypt_field]), 'utf8');
      // convert string to UTF-8 encoded bytes
      const bytes = buffer.getBytes();

      // encrypt data with a public key using RSAES-OAEP/SHA-256/MGF1-SHA-1
      // compatible with Java's RSA/ECB/OAEPWithSHA-256AndMGF1Padding
      const encrypted = publicKey.encrypt(bytes, 'RSA-OAEP', {
        md: forge.md.sha256.create(),
        mgf1: {
          md: forge.md.sha256.create(),
        },
      });
      // base64-encode encrypted data to send to server
      const encrypt_data = forge.util.encode64(encrypted);
      return {
        url,
        options: { ...options, [encrypt_field] : {s: encrypt_data} },
      };
    }

    return {
      url,
      options: { ...options },
    };
  },
  { global: true },
);

export default request;
