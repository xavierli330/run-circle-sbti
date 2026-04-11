import { useState, useCallback } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { calculateResult } from '@/lib/quiz'
import { Question, Answer } from '@/lib/types'
import './index.scss'

const DIMENSION_LABELS: Record<string, string> = {
  A1: '跑步身份', A2: '赛道行为', A3: '装备执念',
  A4: '灵魂深处', A5: '跑步哲学',
  B1: '山野态度', B2: '补给策略', B3: '装备取舍', B4: '完赛心态',
}

export default function Quiz() {
  const [quizState] = useState(() => Taro.getStorageSync('quizState'))
  const [questions] = useState<Question[]>(() => quizState?.questions || [])
  const [userName] = useState<string>(() => quizState?.userName || '匿名跑者')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])

  const currentQuestion = questions[currentIndex]
  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0

  const handleAnswer = useCallback((optionLabel: string) => {
    const question = questions[currentIndex]
    const newAnswers = [...answers, {
      questionId: question.id,
      optionLabel,
      dimension: question.dimension,
    }]

    if (currentIndex < questions.length - 1) {
      setAnswers(newAnswers)
      setCurrentIndex(prev => prev + 1)
    } else {
      const result = calculateResult(newAnswers)
      Taro.setStorageSync('quizResult', {
        userName,
        ...result,
      })
      Taro.navigateTo({ url: '/pages/result/index' })
    }
  }, [currentIndex, questions, answers, userName])

  if (!currentQuestion) return <View />

  return (
    <View className='quiz-screen'>
      <View className='question-header'>
        <Text className='question-progress'>
          {currentIndex + 1} / {questions.length}
        </Text>
        <Text className='question-dimension'>
          {DIMENSION_LABELS[currentQuestion.dimension] || currentQuestion.dimension}
        </Text>
      </View>

      <View className='progress-bar'>
        <View className='progress-fill' style={{ width: `${progress}%` }} />
      </View>

      <Text className='question-text'>{currentQuestion.text}</Text>

      <View className='options'>
        {currentQuestion.options.map(opt => (
          <View
            key={opt.label}
            className='option-btn'
            onClick={() => handleAnswer(opt.label)}
          >
            <View className='option-label-circle'>
              <Text className='option-label-text'>{opt.label}</Text>
            </View>
            <Text className='option-text'>{opt.text}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}
