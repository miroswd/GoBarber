import Sequelize from 'sequelize';
import mongoose from 'mongoose';
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
    this.mongo();
  }

  init() {
    // Método que irá fazer a conexão com o database
    this.connection = new Sequelize(databaseConfig); // já tenho a conexão

    // Percorrendo o array, retornando cada model
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    // Passando a URL de conexão
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/gobarber',
      { useNewUrlParser: true, useFindAndModify: true } // Formato da url um pouco mais nova
    );
  }
}

export default new Database();
