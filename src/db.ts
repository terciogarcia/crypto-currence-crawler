import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  'postgres://crypto:123456@crypto-database:5432/crypto', {
    logging: false
  }
);
