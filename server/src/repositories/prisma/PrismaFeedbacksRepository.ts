import { prisma } from '../../prisma'
import { FeedbackCreateData, FeedbacksRepository } from '../FeedbacksRepository'

// Implementação da funcionalidade (que está separada do contrato)

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create({ type, comment, screenshot }: FeedbackCreateData) {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      },
    })
  }
}
