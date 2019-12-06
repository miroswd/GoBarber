module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('appointments', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        // Data do agendamento
        type: Sequelize.DATE,
        allowNull: false,
      },
      // Referenciando o agendamento com o usuário q agendou
      user_id: {
        type: Sequelize.INTEGER,
        reference: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },

      // Relacionando o prestador ao agendamento
      provider_id: {
        type: Sequelize.INTEGER,
        reference: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE', // Caso os dados sejam atualizados, todos os dados serão atualizados
        onDelete: 'SET NULL',
        allowNull: true,
      },
      canceled_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable('appointments');
  },
};
