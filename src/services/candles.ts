import Candle from 'models/candle';
import { enCryptoSymbols } from 'interfaces/enums';

class CandleService {
  public getOlderBySymbol(symbol: enCryptoSymbols) {
    return Candle.findOne({
      order: [['timestamp', 'asc']],
      where: { symbol }
    });
  }

  public getNewerBySymbol(symbol: enCryptoSymbols) {
    return Candle.findOne({
      order: [['timestamp', 'desc']],
      where: { symbol }
    });
  }
}

export const candleService = new CandleService();