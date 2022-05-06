import { FormEvent, useState } from 'react'
import { ArrowLeft } from 'phosphor-react'

import { FeedbackType, FEEDBACK_TYPES } from '..'
import { CloseButton } from '../../CloseButton'
import { ScreenshotButton } from '../ScreenshotButton'
import { Loading } from '../../Loading'
import { api } from '../../../libs/api'

interface FeedbackContentStepProps {
  feedbackType: FeedbackType
  onFeedbackGoBack: () => void
  onFeedbackSent: () => void
}

export function FeedbackContentStep({
  feedbackType,
  onFeedbackGoBack,
  onFeedbackSent,
}: FeedbackContentStepProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [comment, setComment] = useState('')
  const [isSendingFeedback, setIsSendingFeedback] = useState(false)

  const chosenFeedbackType = FEEDBACK_TYPES[feedbackType]

  async function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault()

    setIsSendingFeedback(true)

    try {
      await api.post('/feedbacks', {
        type: feedbackType,
        comment,
        screenshot,
      })

      onFeedbackSent()
    } catch (err) {
      console.log(err)
    } finally {
      setIsSendingFeedback(false)
    }
  }

  return (
    <>
      <header>
        <button
          onClick={onFeedbackGoBack}
          type="button"
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
          <img
            src={chosenFeedbackType.image.src}
            alt={chosenFeedbackType.image.alt}
            className="w-6 h-6"
          />
          {chosenFeedbackType.title}
        </span>

        <CloseButton />
      </header>

      <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
        <textarea
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="Conte com detahes o que está acontecendo..."
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
        />

        <footer className="flex gap-2 mt-2">
          <ScreenshotButton
            screenshot={screenshot}
            onScreenshotTook={setScreenshot}
          />

          <button
            disabled={comment.trim() === '' || isSendingFeedback}
            type="submit"
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
          >
            {isSendingFeedback ? <Loading /> : 'Enviar feedback'}
          </button>
        </footer>
      </form>
    </>
  )
}
