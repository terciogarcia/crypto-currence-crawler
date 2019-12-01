import 'app-module-path/register';
import { sequelize } from 'db';
import { finhubService } from 'services/finhub';
import { enCryptoSymbols } from 'interfaces/enums';
import { candleService } from 'services/candles';
import Candle from 'models/candle';
import { sleep } from 'helpers/sleep';
import { getKeyByValue } from 'helpers/object';

const crawl = async (symbol: enCryptoSymbols) => {
  const symbolLabel = getKeyByValue(enCryptoSymbols, symbol);

  let numberOfResults: number;
  do {
    const newerEntry = await candleService.getNewerBySymbol(symbol);

    const from = newerEntry ? newerEntry.timestamp : new Date(0);
    const to = new Date();
    to.setMinutes(to.getMinutes() - 1);

    console.info(`Obtaining candles for ${symbolLabel} from ${from.toISOString()} to ${to.toISOString()}`);

    const result = await finhubService.fetchCandles(symbol, from, to);
    await sleep(1000);

    if(!!result.length) await Candle.bulkCreate(result);
    numberOfResults = result.length;
  } while(numberOfResults === 500); // Stop crawling when reach the last page
};

sequelize
  .authenticate()
  .then(async () => {
    for (let symbol of Object.values(enCryptoSymbols)) {
      await crawl(symbol);
    }
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
