import React from 'react'
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  ActivityIndicator,
} from 'react-native'

import { theme } from '../../theme'
import { styles } from './styles'

interface SendFeedbackButtonProps extends TouchableOpacityProps {
  isSending: boolean
}

export function SendFeedbackButton({
  isSending,
  ...rest
}: SendFeedbackButtonProps) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      {isSending ? (
        <ActivityIndicator color={theme.colors.text_on_brand_color} />
      ) : (
        <Text style={styles.title}>Enviar feedback</Text>
      )}
    </TouchableOpacity>
  )
}
