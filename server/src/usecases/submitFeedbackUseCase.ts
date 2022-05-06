import { MailAdapter } from '../adapters/mailAdapter'
import { FeedbacksRepository } from '../repositories/FeedbacksRepository'

interface SubmitFeedbackUseCaseRequest {
  type: string
  comment: string
  screenshot?: string
}

// Esse use case não depende do Prisma
// Se quisermos trocar pra outro ORM por exemplo
// Este use case vai ficar intacto
// Ele não sabe se estamos usando Prisma, TypeORM ou outro

export class SubmitFeedbackUseCase {
  constructor(
    // essa classe depende da interface, e não da implementação
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request

    if (!type) {
      throw new Error('Type is required')
    }

    if (!comment) {
      throw new Error('Comment is required')
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format')
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    })

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        `<img src="${screenshot}" />`,
        `</div>`,
      ].join('\n'),
    })
  }
}
