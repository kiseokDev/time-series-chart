import { TimeSeriesData } from '../types';
import { AxiosHttpClient } from './AxiosHttpClient';

// const server = process.env.REACT_APP_SERVER_URL;
const server = 'http://localhost:4000';

export class ChartDataAPI {
  #endPoint = 'data';
  #client;

  constructor() {
    if (!server) {
      throw new Error('REACT_APP_SERVER_URL is not set');
    }
    this.#client = new AxiosHttpClient(server);
  }

  async getTimeSeriesData(): Promise<TimeSeriesData> {
    const customOptions = {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    };
    return await this.#client.get<TimeSeriesData>(this.#endPoint);
  }
}
