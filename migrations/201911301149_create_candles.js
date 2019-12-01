module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Candles', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      closePrice: { type: 'numeric', allowNull: false },
      highPrice: { type: 'numeric', allowNull: false },
      openPrice: { type: 'numeric', allowNull: false },
      lowPrice: { type: 'numeric', allowNull: false },
      volume: { type: 'double precision', allowNull: false },
      timestamp: { type: 'timestamp', allowNull: false },
      symbol: Sequelize.STRING
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Candles');
  }
};