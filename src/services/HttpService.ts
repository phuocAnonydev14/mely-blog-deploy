import { IParams } from '@/common/@types/service.type';
import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import { deleteCookie, getCookie } from 'cookies-next';
import { EHttpMethod, EToken } from '@/common/enums/app.enum';
import axiosRetry from 'axios-retry';
import { CacheRequestConfig, setupCache } from 'axios-cache-interceptor';
import { jwtDecode } from 'jwt-decode';
import { authService } from '@/services/auth.service';

const isTokenExpired = (token: string) => {
  if (!token) return true;
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp! < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

class HttpService {
  private readonly http: AxiosInstance;
  private baseURL = process.env.NEXT_PUBLIC_BASE_URL || '';

  constructor(customBaseUrl?: string) {
    this.http = setupCache(
      axios.create({
        baseURL: customBaseUrl || this.baseURL,
        withCredentials: false,
        timeout: 5000,
      }),
      {
        // ttl: 1000 * 5, // 5s cache
      },
    );

    this.injectInterceptors();
  }

  // Get authorization token for requests
  private async getAuthorization() {
    let accessToken;

    try {
      // get token on server side
      const cookieStore = await import('next/headers').then((res) => res.cookies());
      accessToken = cookieStore.get(EToken.ACCESS_TOKEN)?.value || '';
    } catch (e) {
      // get token on client side
      accessToken = getCookie(EToken.ACCESS_TOKEN) || '';
    }

    return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
  }

  // Initialize service configuration
  public service() {
    this.injectInterceptors();

    return this;
  }

  // Set up request headers
  private async setupHeaders(
    hasAttachment = false,
    isPublicApi = false,
  ): Promise<AxiosRequestConfig['headers']> {
    const headers: AxiosRequestConfig['headers'] = {
      'Content-Type': hasAttachment ? 'multipart/form-data' : 'application/json',
    };

    if (!isPublicApi) {
      const auth = await this.getAuthorization();
      Object.assign(headers, auth);
    }

    return headers;
  }

  // Handle HTTP requests
  private async request<T>(
    method: EHttpMethod,
    url: string,
    options: AxiosRequestConfig | CacheRequestConfig,
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.http.request<T>({
        method,
        url,
        ...options,
      });
      return response?.data;
    } catch (error) {
      return this.normalizeError(error);
    }
  }

  // Perform GET request
  public async get<T>(
    url: string,
    params?: IParams,
    isPublicApi = false,
    useCache: boolean = true,
  ): Promise<T> {
    return this.request<T>(EHttpMethod.GET, url, {
      params,
      headers: await this.setupHeaders(false, isPublicApi),
      cache: useCache && {
        ttl: 1000 * 5,
        staleIfError: true, // use cache if there's an error
      },
    });
  }

  // Perform POST request
  public async post<T, P>(url: string, payload: P, params?: IParams, isPublicApi = false): Promise<T> {
    return this.request<T>(EHttpMethod.POST, url, {
      params,
      data: payload,
      headers: await this.setupHeaders(payload instanceof FormData, isPublicApi),
    });
  }

  // Perform UPDATE request
  public async update<T, P>(url: string, payload: P, params?: IParams, isPublicApi = false): Promise<T> {
    return this.request<T>(EHttpMethod.PATCH, url, {
      params,
      data: payload,
      headers: await this.setupHeaders(payload instanceof FormData, isPublicApi),
    });
  }

  // Perform DELETE request
  public async remove<T>(url: string, params?: IParams, isPublicApi = false): Promise<T> {
    return this.request<T>(EHttpMethod.DELETE, url, {
      params,
      headers: await this.setupHeaders(false, isPublicApi),
    });
  }

  // Inject interceptors for request and response
  private injectInterceptors() {
    // Set up request interceptor
    this.http.interceptors.request.use(async (request) => {
      // @TODO: implement an NProgress
      const accessToken = getCookie(EToken.ACCESS_TOKEN) || '';
      if (accessToken && isTokenExpired(accessToken)) {
        deleteCookie(EToken.ACCESS_TOKEN);
        await authService.refreshToken();
      }

      return request;
    });

    // Retry logic with axios-retry
    axiosRetry(this.http, {
      retries: 3,
      retryCondition: (error) => {
        return axiosRetry.isNetworkOrIdempotentRequestError(error) || error.code === 'ECONNABORTED';
      },
      retryDelay: (retryCount) => {
        console.log(`Retry attempt: ${retryCount}`);
        return retryCount * 1000; // delay 1S
      },
    });

    // Set up response interceptor
    this.http.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.code === 'ECONNABORTED') {
          console.error('Request timed out');
        }
        if (!error.response) return;
        const statusCode = error.response.status;
        if (statusCode === 401) {
          deleteCookie(EToken.ACCESS_TOKEN);
          console.warn('Unauthorized. Redirecting to home page...');
          window.location.href = '/';
        }

        if (statusCode === 403) {
          console.warn('Forbidden access');
        }

        if (statusCode === 500) {
          console.error('Internal Server Error');
        }
        return this.normalizeError(error);
      },
    );
  }

  // Normalize errors
  private normalizeError(error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    return Promise.reject(error);
  }
}

export { HttpService as default };
