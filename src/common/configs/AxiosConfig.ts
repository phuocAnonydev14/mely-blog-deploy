import { AxiosRequestConfig } from 'axios';

const axiosConfigs = {
  development: {
    baseURL: process.env['NEXT_PUBLIC_LOCAL_API_URL'],
    timeout: 10000,
  },
  production: {
    baseURL: process.env['NEXT_PUBLIC_PRODUCTION_API_URL'],
    timeout: 10000,
  },
  test: {
    baseURL: process.env['NEXT_PUBLIC_TEST_API_URL'],
    timeout: 10000,
  },
};

const getAxiosConfig = (): AxiosRequestConfig => {
  const nodeEnv: string = process.env['NEXT_PUBLIC_NODE_ENV'] ?? 'development';
  return axiosConfigs[nodeEnv as keyof typeof axiosConfigs];
};

const axiosConfig = getAxiosConfig();

export default axiosConfig;
