import { SubmitFeedbackUseCase } from './submitFeedbackUseCase'

// spies -> forma de saber se uma função dentro do teste foi chamada

const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
)

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'Bug na aplicação',
        screenshot: 'data:image/png;base64,784747399849',
      })
    ).resolves.not.toThrow()

    expect(createFeedbackSpy).toHaveBeenCalled()
    expect(sendMailSpy).toHaveBeenCalled()
  })

  it('should not be able to submit feedback without type', async () => {
    await expect(
      submitFeedback.execute({
        type: '',
        comment: 'Bug na aplicação',
        screenshot: 'data:image/png;base64,784747399849',
      })
    ).rejects.toThrow()
  })

  it('should not be able to submit feedback without a comment', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: '',
        screenshot: 'data:image/png;base64,784747399849',
      })
    ).rejects.toThrow()
  })

  it('should not be able to submit feedback with an invalid screenshot format', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'Bug na aplicação',
        screenshot: 'bug.png',
      })
    ).rejects.toThrow()
  })
})
