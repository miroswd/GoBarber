// Configuraçṍes para envio de email

export default {
  host: 'smtp.mailtrap.io',
  port: '2525',
  secure: false,
  auth: {
    user: 'e7d5cd70baf4c9',
    pass: 'ec9258cdc6e775',
  },
  default: {
    from: 'Equipe GoBarber <noreply@gobarber.com>',
  },
};

//  Serviços de envio de email
/*
Amazon SES
Mailgun
Mailtrap -> para ambiente de desenvolvimento
*/
