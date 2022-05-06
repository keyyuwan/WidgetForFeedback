import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ArrowLeft } from 'phosphor-react-native'
import { captureScreen } from 'react-native-view-shot'
import * as FileSystem from 'expo-file-system'

import { api } from '../../libs/api'

import { ScreenshotButton } from '../ScreenshotButton'
import { SendFeedbackButton } from '../SendFeedbackButton'
import { Copyright } from '../Copyright'

import { feedbackTypes } from '../../utils/feedbackTypes'
import { FeedbackTypes } from '../Widget'

import { theme } from '../../theme'
import { styles } from './styles'

interface FormProps {
  feedbackType: FeedbackTypes
  onResetFeedback: () => void
  onFeedbackBeenSent: () => void
}

export function Form({
  feedbackType,
  onResetFeedback,
  onFeedbackBeenSent,
}: FormProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [isSending, setIsSending] = useState(false)
  const [comment, setComment] = useState('')

  async function handleScreenshot() {
    try {
      const screenshotUri = await captureScreen({
        format: 'jpg',
        quality: 0.8,
      })

      setScreenshot(screenshotUri)
    } catch (err) {
      console.log(err)
    }
  }

  function handleRemoveScreenshot() {
    setScreenshot(null)
  }

  async function handleSubmitFeedback() {
    if (isSending) {
      return
    }

    setIsSending(true)

    const screenshotBase64 =
      screenshot &&
      (await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64' }))

    try {
      await api.post('/feedbacks', {
        type: feedbackType,
        screenshot: `data:image/png;base64, ${screenshotBase64}`,
        comment,
      })

      onFeedbackBeenSent()
    } catch (err) {
      console.log(err)
    } finally {
      setIsSending(false)
    }
  }

  const feedbackInfo = feedbackTypes[feedbackType]

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onResetFeedback}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image source={feedbackInfo.image} style={styles.image} />
          <Text style={styles.title}>{feedbackInfo.title}</Text>
        </View>
      </View>

      <TextInput
        onChangeText={setComment}
        multiline
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
        placeholderTextColor={theme.colors.text_secondary}
        autoCorrect={false}
        style={styles.input}
      />

      <View style={styles.footer}>
        <ScreenshotButton
          screenshot={screenshot}
          onTakeScreenshot={handleScreenshot}
          onRemoveScreenshot={handleRemoveScreenshot}
        />

        <SendFeedbackButton
          isSending={isSending}
          onPress={handleSubmitFeedback}
        />
      </View>

      <Copyright />
    </View>
  )
}
