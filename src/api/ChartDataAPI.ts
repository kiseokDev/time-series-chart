import { TimeSeriesData } from '../types';
import { AxiosHttpClient } from './AxiosHttpClient';

// const server = process.env.REACT_APP_MOCK_DB;
const server = 'http://localhost:4000';

if (!server) {
  throw new Error('REACT_APP_SERVER_URL is not set');
}

export class ChartDataAPI {
  #endPoint = 'data';
  #client;

  constructor() {
    this.#client = new AxiosHttpClient(server);
  }

  async getTimeSeriesData(): Promise<TimeSeriesData> {
    return await this.#client.get<TimeSeriesData>(this.#endPoint);
  }
}
