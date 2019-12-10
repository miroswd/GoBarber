require('dotenv/config');
// Credenciais para acessar o banco de dados
module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamps: true, // createAt e updateAt
    underscored: true, // Usando underscore nas tabelas ao invés de camelCase
    underscoredAll: true, // Usando underscore nas colunas ao invés de camelCase
  },
};
