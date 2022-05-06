import { Camera, Trash } from 'phosphor-react-native'
import React from 'react'
import { Image, TouchableOpacity } from 'react-native'

import { theme } from '../../theme'
import { styles } from './styles'

interface ScreenshotButtonProps {
  screenshot: string | null
  onTakeScreenshot: () => Promise<void>
  onRemoveScreenshot: () => void
}

export function ScreenshotButton({
  screenshot,
  onTakeScreenshot,
  onRemoveScreenshot,
}: ScreenshotButtonProps) {
  return (
    <TouchableOpacity
      onPress={screenshot ? onRemoveScreenshot : onTakeScreenshot}
      style={styles.container}
    >
      {screenshot ? (
        <>
          <Image source={{ uri: screenshot }} style={styles.image} />
          <Trash
            size={22}
            color={theme.colors.text_secondary}
            weight="fill"
            style={styles.removeIcon}
          />
        </>
      ) : (
        <Camera size={24} color={theme.colors.text_secondary} weight="bold" />
      )}
    </TouchableOpacity>
  )
}
