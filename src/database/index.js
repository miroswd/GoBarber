import Sequelize from 'sequelize';

// Importando as credenciais
import databaseConfig from '../config/database';

// Importando os models
import Appointment from '../app/models/Appointments';
import File from '../app/models/File';
import User from '../app/models/User';

const models = [Appointment, File, User]; // Armazena todos os models

class Database {
  constructor() {
    this.init();
  }

  init() {
    // Método que irá fazer a conexão com o database
    this.connection = new Sequelize(databaseConfig); // já tenho a conexão

    // Percorrendo o array, retornando cada model
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
