// Configurações do envio de email
import nodemailer from 'nodemailer';
import { resolve } from 'path'; // Será utilizado para encontrar o caminho dos templates

// Módulos para o template de email
import exphbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';

// Credenciais
import mailConfig from '../config/mail';

class Mail {
  constructor() {
    const { host, port, secure, auth } = mailConfig;

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    }); // Como o nodemailer chama uma conexão externa para enviar email
    this.configureTemplates();
  }

  configureTemplates() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');

    this.transporter.use(
      'compile',
      nodemailerhbs({
        viewEngine: exphbs.create({
          layoutsDir: resolve(viewPath, 'layouts'), // Pasta layouts
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default', // layout padrão que irá utilizar
          extname: '.hbs', // Extensão dos arquivos
        }),
        viewPath,
        extName: '.hbs',
      })
    ); // Como formata a mensagem
  }

  sendMail(message) {
    return this.transporter.sendMail({ ...mailConfig.default, ...message });
  }
}

export default new Mail();
