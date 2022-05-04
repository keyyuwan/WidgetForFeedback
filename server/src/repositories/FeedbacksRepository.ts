// Contrato (contrato e implementação separados)

export interface FeedbackCreateData {
  type: string
  comment: string
  screenshot?: string
}

export interface FeedbacksRepository {
  create: (data: FeedbackCreateData) => Promise<void>
}
