import React, { useRef, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { ChatTeardropDots } from 'phosphor-react-native'
import BottomSheet from '@gorhom/bottom-sheet'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'

import { Options } from '../Options'
import { Form } from '../Form'
import { Success } from '../Success'

import { feedbackTypes } from '../../utils/feedbackTypes'

import { theme } from '../../theme'
import { styles } from './styles'

export type FeedbackTypes = keyof typeof feedbackTypes

function Widget() {
  const [feedbackType, setFeedbackType] = useState<FeedbackTypes | null>(null)
  const [hasFeedbackBeenSent, setHasFeedbackBeenSent] = useState(false)

  function handleChooseFeedbackType(type: FeedbackTypes) {
    setFeedbackType(type)
  }

  function handleResetFeedback() {
    setFeedbackType(null)
    setHasFeedbackBeenSent(false)
  }

  const bottomSheetRef = useRef<BottomSheet>(null)

  function handleOpen() {
    bottomSheetRef.current?.expand()
  }

  return (
    <>
      <TouchableOpacity onPress={handleOpen} style={styles.button}>
        <ChatTeardropDots
          size={24}
          weight="bold"
          color={theme.colors.text_on_brand_color}
        />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {hasFeedbackBeenSent ? (
          <Success onResetFeedback={handleResetFeedback} />
        ) : (
          <>
            {feedbackType ? (
              <Form
                feedbackType={feedbackType}
                onResetFeedback={handleResetFeedback}
                onFeedbackBeenSent={() => setHasFeedbackBeenSent(true)}
              />
            ) : (
              <Options onChooseFeedbackType={handleChooseFeedbackType} />
            )}
          </>
        )}
      </BottomSheet>
    </>
  )
}

export default gestureHandlerRootHOC(Widget)
