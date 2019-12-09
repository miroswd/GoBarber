// Configurando a fila - cada bgjob terá uma fila
import Bee from 'bee-queue';
import redisConfig from '../config/redis';
import CancellationMail from '../app/jobs/CancellationMail';

const jobs = [CancellationMail];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    // Inicializando as filas
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }), // Instância que conecta com o redis, armazena e recupera valores do database
        handle, // Recebe as variáveis de dentro do appointment
      };
    });
  }

  add(queue, job) {
    // Adicionando novos itens dentro da fila
    // queue == Qual fila quero adicionar um novo trabalho
    // job == dados
    return this.queues[queue].bee.createJob(job).save(); // Armazena o job dentro da fila
  }

  processQueue() {
    // Processando as filas em tempo real
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];
      bee.process(handle);
    });
  }
}

export default new Queue();
