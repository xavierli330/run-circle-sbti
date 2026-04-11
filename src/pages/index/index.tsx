import { useState } from 'react'
import { View, Text, Input, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { generateQuiz } from '@/lib/quiz'
import { fetchQuestions } from '@/lib/cloud'
import './index.scss'

export default function Index() {
  const [nameInput, setNameInput] = useState('')
  const [loading, setLoading] = useState(false)

  const startQuiz = async () => {
    setLoading(true)
    try {
      const name = nameInput.trim() || '匿名跑者'
      const allQuestions = await fetchQuestions()

      if (allQuestions.length === 0) {
        Taro.showToast({ title: '题目加载失败，请检查网络', icon: 'none' })
        return
      }

      const quiz = generateQuiz(allQuestions)
      Taro.setStorageSync('quizState', {
        userName: name,
        questions: quiz.questions,
      })
      Taro.navigateTo({ url: '/pages/quiz/index' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <View className='start-screen'>
      <View className='start-badge'>跑圈专属测试</View>
      <Text className='start-title'>
        跑圈<Text className='highlight'>SBTI</Text>
      </Text>
      <Text className='start-subtitle'>你是哪种跑者？</Text>
      <Text className='start-desc'>
        每次随机15题{'\n'}
        4个宏观维度，拷问灵魂深处{'\n'}
        24种跑步人格等你解锁
      </Text>

      <View className='name-input-wrap'>
        <Input
          className='name-input'
          type='text'
          placeholder='怎么称呼你？（可选）'
          placeholderClass='name-input-placeholder'
          value={nameInput}
          onInput={e => setNameInput(e.detail.value)}
          maxlength={20}
        />
      </View>

      <Button className='start-btn' onClick={startQuiz} disabled={loading}>
        {loading ? '加载中...' : '90秒测出你的跑步人格'}
      </Button>
    </View>
  )
}
