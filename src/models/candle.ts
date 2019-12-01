
import * as Sequelize from 'sequelize';
import { sequelize } from '../db';

export interface ICandle {
    id?: number;
    closePrice: number;
    highPrice: number;
    openPrice: number;
    lowPrice: number;
    volume: number;
    timestamp: Date;
}

class Candle extends Sequelize.Model implements ICandle {
  public id?: number;
  public closePrice: number;
  public highPrice: number;
  public openPrice: number;
  public lowPrice: number;
  public volume: number;
  public timestamp: Date;
}
Candle.init({
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  closePrice: { type: Sequelize.NUMBER, allowNull: false},
  highPrice: { type: Sequelize.NUMBER, allowNull: false},
  openPrice: { type: Sequelize.NUMBER, allowNull: false},
  lowPrice: { type: Sequelize.NUMBER, allowNull: false},
  volume: { type: Sequelize.NUMBER, allowNull: false},
  timestamp: { type: Sequelize.DATE, allowNull: false},
  symbol: { type: Sequelize.STRING, allowNull: false}
}, {
  timestamps: false,
  sequelize,
  modelName: 'Candle'
});

export default Candle;