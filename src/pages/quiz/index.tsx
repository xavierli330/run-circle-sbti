import { useState, useCallback } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { calculateResult, DIMENSION_LABELS } from '@/lib/quiz'
import { Question, Answer } from '@/lib/types'
import './index.scss'

const getPhaseLabel = (current: number, total: number): string => {
  const ratio = current / total
  if (ratio <= 0.2) return '还在热身，心率还没上来'
  if (ratio <= 0.47) return '进入巡航配速，有点感觉了'
  if (ratio <= 0.73) return '撞墙期快到了，坚持住'
  return '最后冲刺，马上看到终点'
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
        <Text className='question-phase'>{getPhaseLabel(currentIndex, questions.length)}</Text>
        <Text className='question-dimension'>
          {DIMENSION_LABELS[currentQuestion.dimension] || currentQuestion.dimension}
        </Text>
      </View>

      <View className='progress-bar'>
        <View className='progress-fill' style={{ width: `${progress}%` }} />
      </View>

      <View className={`question-body ${currentQuestion.isSoul ? 'soul-question' : ''}`}>
        <Text className='question-text'>{currentQuestion.text}</Text>
        {currentQuestion.isSoul && <Text className='soul-badge'>灵魂拷问</Text>}
      </View>

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
