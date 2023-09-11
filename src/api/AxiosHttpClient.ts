import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

const instance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use(
  function (response: AxiosResponse) {
    return response;
  },
  function (error: AxiosError) {
    console.error('Error', error.message);
    return Promise.reject(error);
  }
);

export class AxiosHttpClient {
  #BASE_URL: string;
  #axiosInstance: AxiosInstance;
  constructor(private readonly url: string) {
    this.#BASE_URL = url;
    this.#axiosInstance = axios.create({
      baseURL: this.#BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public async get<T>(endPoint: string, option = {}): Promise<T> {
    const response: AxiosResponse<T> = await this.#axiosInstance.get<T>(
      `${endPoint}`,
      option
    );
    return response.data;
  }
}
