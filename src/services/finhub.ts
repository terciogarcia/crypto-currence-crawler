import { ICandle } from 'models/candle';
import axios from 'axios';
import { FINHUB_API_KEY } from 'settings';
import { toUnixDate } from 'helpers/date';

const BASE_URL = 'https://finnhub.io/api/v1';

class FinhubService {
  public async fetchCandles(symbol: string, from: Date, to: Date): Promise<ICandle[]> {
    try {
      const response = await axios.get(`${BASE_URL}/crypto/candle`, {
        params: {
          symbol,
          resolution: 1,
          token: FINHUB_API_KEY,
          from: toUnixDate(from),
          to: toUnixDate(to)
        }
      });

      const { data } = response;

      return data.c.map((entry: any, index: number) => ({
        closePrice: entry,
        highPrice: data.h[index],
        openPrice: data.o[index],
        lowPrice: data.l[index],
        volume: data.v[index],
        timestamp: new Date(data.t[index] * 1000),
        symbol
      }));
    } catch (error) {
      console.log(error) ;
      return [];
    }
  }
}

export const finhubService = new FinhubService();