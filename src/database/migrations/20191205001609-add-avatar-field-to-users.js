// Retorna colunas

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users', // Nome da tabela para adicionar coluna
      'avatar_id', // Nome da coluna
      {
        type: Sequelize.INTEGER,
        references: { model: 'files', key: 'id' }, // Referência, chave estrangeira
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL', // Caso o avatar seja deletado, oq acontece com o avatar_id no database
        allowNull: true,
      }
    );
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'avatar_id');
  },
};
