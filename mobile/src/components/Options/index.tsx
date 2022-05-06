import React from 'react'
import { Text, View } from 'react-native'

import { Copyright } from '../Copyright'
import { Option } from '../Option'
import { feedbackTypes } from '../../utils/feedbackTypes'
import { FeedbackTypes } from '../Widget'

import { styles } from './styles'

interface OptionsProps {
  onChooseFeedbackType: (type: FeedbackTypes) => void
}

export function Options({ onChooseFeedbackType }: OptionsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deixe seu feedback</Text>

      <View style={styles.options}>
        {Object.entries(feedbackTypes).map(([key, value]) => (
          <Option
            onPress={() => onChooseFeedbackType(key as FeedbackTypes)}
            key={key}
            title={value.title}
            image={value.image}
          />
        ))}
      </View>

      <Copyright />
    </View>
  )
}
