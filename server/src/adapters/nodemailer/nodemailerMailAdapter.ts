import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from '../mailAdapter'

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '5ec5bc68893083',
    pass: '2fa61d7ffaacd5',
  },
})

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <fidget@gmail.com>',
      to: 'Key Yu Wan <keyflcbyuwan@gmail.com>',
      subject,
      html: body,
    })
  }
}
