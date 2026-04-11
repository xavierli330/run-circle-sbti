import { useState } from 'react'
import { View, Text, Input, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { generateQuiz } from '@/lib/quiz'
import './index.scss'

export default function Index() {
  const [nameInput, setNameInput] = useState('')

  const startQuiz = () => {
    const name = nameInput.trim() || '匿名跑者'
    const quiz = generateQuiz()
    Taro.setStorageSync('quizState', {
      userName: name,
      questions: quiz.questions,
    })
    Taro.navigateTo({ url: '/pages/quiz/index' })
  }

  return (
    <View className='start-screen'>
      <View className='start-badge'>跑圈专属测试</View>
      <Text className='start-title'>
        跑圈<Text className='highlight'>SBTI</Text>
      </Text>
      <Text className='start-subtitle'>你是哪种跑者？</Text>
      <Text className='start-desc'>
        110道题池，每次随机抽32道{'\n'}
        9个维度，拷问灵魂深处{'\n'}
        发现你的跑步人格
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

      <Button className='start-btn' onClick={startQuiz}>
        开始测试
      </Button>
      <Text className='start-note'>约需 3-5 分钟</Text>
    </View>
  )
}
