// Credenciais para acessar o banco de dados
module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  datase: 'gobarber',
  define: {
    timestamps: true, // createAt e updateAt
    underscored: true, // Usando underscore nas tabelas ao invés de camelCase
    underscoredAll: true, // Usando underscore nas colunas ao invés de camelCase
  },
};
