import { defineConfig } from 'umi';
import routes from './routes.config';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  fastRefresh: {},
  history: {
    type: 'browser',
  },
  proxy: proxy[REACT_APP_ENV || 'dev'],
  title: false,
  externals: {
    react: 'window.React',
    'react-dom': 'window.ReactDOM',
  },
  scripts:
    REACT_APP_ENV === 'production'
      ? [
          'https://gw.alipayobjects.com/os/lib/react/16.13.1/umd/react.production.min.js',
          'https://gw.alipayobjects.com/os/lib/react-dom/16.13.1/umd/react-dom.production.min.js',
        ]
      : [
          'https://gw.alipayobjects.com/os/lib/react/16.13.1/umd/react.development.js',
          'https://gw.alipayobjects.com/os/lib/react-dom/16.13.1/umd/react-dom.development.js',
        ],
});
