import { Question } from './types'

export const generalQuestions: Question[] = [
  // ============ A1 动机与身份认同 ============
  {
    id: 'A1', dimension: 'A1', isSoul: false,
    text: '朋友问你在干什么，你通常怎么回答？',
    options: [
      { label: 'A', text: '「我在跑步」（然后发一张跑步记录截图，精确到小数点后两位）' },
      { label: 'B', text: '「跑步去了」（但实际上刚打开APP还没出门）' },
      { label: 'C', text: '忽略消息，等跑完再回复，假装刚才在忙' },
      { label: 'D', text: '直接发语音定位，实时播报进度，让对方感受我的痛苦' },
    ]
  },
  {
    id: 'A2', dimension: 'A1', isSoul: false,
    text: '你决定开始跑步的契机是什么？',
    options: [
      { label: 'A', text: '体检报告出了问题，医生说再不动起来就要吃药了' },
      { label: 'B', text: '刷到朋友圈有人跑了马拉松，奖牌精修图太好看' },
      { label: 'C', text: '某个深夜照镜子，觉得自己不能就这样烂掉' },
      { label: 'D', text: '其实没什么契机，某天路过跑道就顺便跑了一下' },
    ]
  },
  {
    id: 'A3', dimension: 'A1', isSoul: false,
    text: '跑步的时候，你的大脑通常在处理什么？',
    options: [
      { label: 'A', text: '计算离终点还有多少公里，顺便计算人生的意义' },
      { label: 'B', text: '构思一篇还没动笔的旷世巨著，跑步只是背景音' },
      { label: 'C', text: '脑子里一片空白，像死机的电脑，但腿还在自动运行' },
      { label: 'D', text: '跟遇到的每一个人吵架，包括路边的树' },
    ]
  },
  {
    id: 'A4', dimension: 'A2', isSoul: true,
    text: '如果跑步是一场游戏，你觉得自己现在是哪个阶段？',
    options: [
      { label: 'A', text: '新手村，刚出来的新手，连装备都没配齐' },
      { label: 'B', text: '卡在某个等级很久了，升级速度比微信打字还慢' },
      { label: 'C', text: '已经通关过一次，正在刷二周目找成就感' },
      { label: 'D', text: '发现了游戏的bug，但我不打算反馈，准备用到死' },
    ]
  },
  {
    id: 'A5', dimension: 'A1', isSoul: false,
    text: '你对「坚持跑步」这件事怎么看？',
    options: [
      { label: 'A', text: '跑步不需要坚持，它已经是我生活的一部分，像呼吸一样自然' },
      { label: 'B', text: '坚持是必须的，不跑满里程就觉得自己是个废物' },
      { label: 'C', text: '看心情、看天气、看最近有没有好吃的在等我' },
      { label: 'D', text: '我不需要坚持，我只是偶尔跑一下，不跑也不会骂自己' },
    ]
  },
  {
    id: 'A6', dimension: 'A1', isSoul: false,
    text: '有人说「跑步是一场跟自己的对话」，你怎么看？',
    options: [
      { label: 'A', text: '同意，跑步时确实能想通很多事情，对话质量很高' },
      { label: 'B', text: '不同意，我跑步时只想赶紧结束，对话对象是终点线' },
      { label: 'C', text: '我跟自己的对话经常变成吵架，最后不欢而散' },
      { label: 'D', text: '我觉得这句话很矫情，跑步就是跑步，想那么多干嘛' },
    ]
  },
  {
    id: 'A7', dimension: 'A1', isSoul: false,
    text: '你会在朋友圈发跑步内容吗？',
    options: [
      { label: 'A', text: '每次跑完必发，图文必须精致，数据必须截图，滤镜必须到位' },
      { label: 'B', text: '只发重要的——首马、破PB、或者精修过的完赛照' },
      { label: 'C', text: '很少发，跑步是我自己的事，不需要表演' },
      { label: 'D', text: '从来不发，我连朋友圈都关了，社交只会影响我跑步' },
    ]
  },
  {
    id: 'A8', dimension: 'A1', isSoul: false,
    text: '跑步途中偶遇心动对象/前任/crush，你会？',
    options: [
      { label: 'A', text: '远远保持距离，等对方先发现我，假装很随意' },
      { label: 'B', text: '慢慢跟在后面，找机会自然地搭个话' },
      { label: 'C', text: '主动上去打招呼，顺便问一下你跑几公里' },
      { label: 'D', text: '加速拉爆！让对方记住我的背影——心中只有配速，没有感情' },
    ]
  },
  {
    id: 'A9', dimension: 'A1', isSoul: false,
    text: '你今天计划跑10公里，现在跑了9.87公里，你会？',
    options: [
      { label: 'A', text: '停下来，不跑了，今天就这样，9.87也很吉利' },
      { label: 'B', text: '凑到10公里再停，哪怕是慢摇也要跑到整数' },
      { label: 'C', text: '继续跑到10.01，谁还没点强迫症，但绝不多跑一步' },
      { label: 'D', text: '看心情，反正手表会记录，出去就是胜利' },
    ]
  },
  {
    id: 'A10', dimension: 'A1', isSoul: false,
    text: '跑圈里，你最讨厌哪种人？',
    options: [
      { label: 'A', text: '跑得慢但超级能说，赛道就是他的聊天室，占着路还聊得欢' },
      { label: 'B', text: '数据党，每次聊天都要报配速、报跑量，卷死别人' },
      { label: 'C', text: '佛系装逼犯，嘴里说「我随便跑跑」，成绩出来比谁都认真' },
      { label: 'D', text: '那些每次问「你跑步减肥了吗」的人，跑步不是为了减肥！' },
    ]
  },
  {
    id: 'A11', dimension: 'A1', isSoul: true,
    text: '有人问你「你跑得很快吧」，你怎么回应？',
    options: [
      { label: 'A', text: '甩出数据截图，配速、里程、完赛时间，一目了然' },
      { label: 'B', text: '谦虚地说「还行吧」，但心里其实对自己的成绩很骄傲' },
      { label: 'C', text: '说不快，然后解释一堆原因：最近没练/状态不好/天气太热' },
      { label: 'D', text: '转移话题：「你跑吗？」然后听对方倾诉工作忙' },
    ]
  },
  {
    id: 'A12', dimension: 'A1', isSoul: false,
    text: '群里有人发约跑链接，你会？',
    options: [
      { label: 'A', text: '看时间看地点看人数，都合适就去' },
      { label: 'B', text: '看谁组织，不熟的人组织的就不去' },
      { label: 'C', text: '从不参加约跑，一个人跑更自在' },
      { label: 'D', text: '每次都去，但每次都是自己跑自己的' },
    ]
  },
  {
    id: 'A13', dimension: 'A1', isSoul: false,
    text: '你更愿意跟什么样的人一起跑步？',
    options: [
      { label: 'A', text: '比我快的人，被带节奏的感觉很爽' },
      { label: 'B', text: '比我慢的人，可以边跑边聊天不无聊' },
      { label: 'C', text: '跟我差不多的人，配速相近，互相不尴尬' },
      { label: 'D', text: '我一个人跑，跑步是独处的时光，不需要任何人' },
    ]
  },
  {
    id: 'A14', dimension: 'A1', isSoul: false,
    text: '跑步对你来说，更像是什么？',
    options: [
      { label: 'A', text: '修行，每一步都是在磨炼意志' },
      { label: 'B', text: '消磨时间的方式，跟刷短视频一样，只是更累' },
      { label: 'C', text: '医学，每天跑步是为了让体检报告好看一点' },
      { label: 'D', text: '生活基本需求，不跑才奇怪，像不刷牙一样难受' },
    ]
  },
  {
    id: 'A15', dimension: 'A1', isSoul: true,
    text: '如果你可以给10年前的自己一条跑步建议，你会说什么？',
    options: [
      { label: 'A', text: '早点开始，别等到身体出问题才动起来' },
      { label: 'B', text: '别买那么多装备，省下的钱够报二十场马拉松了' },
      { label: 'C', text: '配速放慢一点，跑步是一辈子的事，不着急' },
      { label: 'D', text: '记得享受跑步，不要忘记当初为什么开始' },
    ]
  },
  // ============ A2 赛道行为模式 ============
  {
    id: 'A16', dimension: 'A2', isSoul: false,
    text: '比赛开始前30分钟，你一般在做什么？',
    options: [
      { label: 'A', text: '在起点热身区反复拉伸，同时盯着手表等GPS定位成功' },
      { label: 'B', text: '在厕所排队，已经排了25分钟了' },
      { label: 'C', text: '在起点拱门前拍照，发一条「即将开跑」的朋友圈' },
      { label: 'D', text: '坐在地上发呆，已经进入了放空状态，脑子一片空白' },
    ]
  },
  {
    id: 'A17', dimension: 'A2', isSoul: false,
    text: '发令枪响了，你前5公里是什么状态？',
    options: [
      { label: 'A', text: '人挡杀人，佛挡杀佛，配速比平时快30秒，感觉要破纪录' },
      { label: 'B', text: '压住速度，严格按照计划跑，告诉自己前半程要保守' },
      { label: 'C', text: '找不到节奏，被各种人超，心里有点慌' },
      { label: 'D', text: '在人群里穿梭，边跑边欣赏周围人的装备和表情' },
    ]
  },
  {
    id: 'A18', dimension: 'A2', isSoul: false,
    text: '马拉松30公里后，你进入了传说中的「撞墙期」，这时候你会？',
    options: [
      { label: 'A', text: '用意志力硬抗，告诉自己再坚持一下就到了' },
      { label: 'B', text: '走走跑跑，但绝不停止，停止就意味着彻底放弃' },
      { label: 'C', text: '停下来拉伸，顺便吃点东西，走路也没什么丢人的' },
      { label: 'D', text: '脑子里在想：下次再也不报全马了，人生还有很多更重要的事' },
    ]
  },
  {
    id: 'A19', dimension: 'A2', isSoul: false,
    text: '补给站对你来说意味着什么？',
    options: [
      { label: 'A', text: '每一个补给站都必须进，进去本身就是仪式感' },
      { label: 'B', text: '精确计算进站时机，逢站必补，但每次只喝一口' },
      { label: 'C', text: '一定会进去拿海绵往脖子上一拍，那个感觉太爽了' },
      { label: 'D', text: '我一般不进补给站，浪费时间，我提前准备好了一切' },
    ]
  },
  {
    id: 'A20', dimension: 'A2', isSoul: false,
    text: '终点线前最后100米，你在想什么？',
    options: [
      { label: 'A', text: '加速！必须拼尽全力冲过去，哪怕抽筋也要帅' },
      { label: 'B', text: '摆姿势，准备好表情，等着终点摄影师抓拍' },
      { label: 'C', text: '终于到了，我可以发朋友圈了，计时钟是我的背景板' },
      { label: 'D', text: '内心毫无波澜，甚至有点想笑，这只是又一个终点而已' },
    ]
  },
  {
    id: 'A21', dimension: 'A2', isSoul: false,
    text: '你冲过终点线后，第一件事是做什么？',
    options: [
      { label: 'A', text: '立刻掏出手机，边走边发朋友圈，图文必须第一时间发出' },
      { label: 'B', text: '找志愿者要完赛包，然后找个地方坐下，大口喘气' },
      { label: 'C', text: '在终点拱门前拍倒计时姿势照片，奖牌必须挂在胸前' },
      { label: 'D', text: '四处找冰可乐，完赛后的第一口可乐比任何补给品都重要' },
    ]
  },
  {
    id: 'A22', dimension: 'A2', isSoul: false,
    text: '你跑步的时候，以下哪种情况最让你崩溃？',
    options: [
      { label: 'A', text: '跑到一半手机没电/手表没电，所有数据全部丢失' },
      { label: 'B', text: '鞋带松开，必须停下来系，还打了死结' },
      { label: 'C', text: '短裤磨腿，跑完发现大腿根红了一片' },
      { label: 'D', text: '某个不可描述的部位被磨到怀疑人生，还不能抓' },
    ]
  },
  {
    id: 'A23', dimension: 'A2', isSoul: false,
    text: '跑步跑到一半，你突然停下来，可能是因为：',
    options: [
      { label: 'A', text: '风景太好了，必须拍一张，哪怕只是路边的狗尾巴草' },
      { label: 'B', text: '鞋里有石子/袜子歪了/手机要掉了' },
      { label: 'C', text: '遇到了一只狗/猫，我停下来跟它对视' },
      { label: 'D', text: '突然觉得跑步好无聊，我在干什么人生也在这样吗' },
    ]
  },
  {
    id: 'A24', dimension: 'A5', isSoul: true,
    text: '如果你的跑步是一场电影，它现在处于：',
    options: [
      { label: 'A', text: '开场秀，热血开场，主人公刚开始接受训练' },
      { label: 'B', text: '第三章，主角遇到了瓶颈期，正在挣扎' },
      { label: 'C', text: '高潮前传，蓄力中，一切都在掌控中' },
      { label: 'D', text: '彩蛋，负责搞笑的那个，跑完才发现连主角都不是' },
    ]
  },
  {
    id: 'A25', dimension: 'A2', isSoul: false,
    text: '比赛前一天晚上，你一般几点睡？',
    options: [
      { label: 'A', text: '跟平时一样，10点-11点，跑步不应该影响作息' },
      { label: 'B', text: '比平时晚一点，因为太兴奋睡不着' },
      { label: 'C', text: '比平时早一点，为第二天养精蓄锐' },
      { label: 'D', text: '这个问题让我想起一句话：跑者都是睡眠骗子' },
    ]
  },
  {
    id: 'A26', dimension: 'A4', isSoul: false,
    text: '赛前一周，你会怎么调整状态？',
    options: [
      { label: 'A', text: '严格按照训练计划减量，保证睡眠，多吃碳水' },
      { label: 'B', text: '跟平时一样跑，不做任何特殊准备，该吃吃该喝喝' },
      { label: 'C', text: '停止跑步，让身体完全休息，甚至比平时走得还少' },
      { label: 'D', text: '我一般到比赛前才会想起来要准备，提前一周？不存在的' },
    ]
  },
  {
    id: 'A27', dimension: 'A4', isSoul: false,
    text: '比赛结束后的一周内，你会怎么安排跑步？',
    options: [
      { label: 'A', text: '彻底休息，一周都不跑，让身体完全恢复' },
      { label: 'B', text: '慢跑2-3次，每次5公里以内，以放松为主' },
      { label: 'C', text: '感觉状态出奇的好，第三天就开始正常训练了' },
      { label: 'D', text: '说好要跑，但每天都有别的事，一直拖到下一场比赛报名' },
    ]
  },
  {
    id: 'A28', dimension: 'A2', isSoul: false,
    text: '你通常在什么时候跑步？',
    options: [
      { label: 'A', text: '早晨，闹钟响之前就醒了，出门跑完回来别人还没起床' },
      { label: 'B', text: '晚上，夜跑，城市的灯光和安静是我的跑步背景' },
      { label: 'C', text: '中午，利用午休时间跑，这种反人类操作只有我能做' },
      { label: 'D', text: '没有固定时间，看心情，看天气，看哪天不加班' },
    ]
  },
  {
    id: 'A29', dimension: 'A2', isSoul: false,
    text: '跑步的时候，你一般听什么？',
    options: [
      { label: 'A', text: '音乐，电子的、动感的、节奏快的，跑步就是我的DJ时间' },
      { label: 'B', text: '播客/有声书，利用跑步时间学习，卷死别人' },
      { label: 'C', text: '不听任何东西，就听自己的呼吸和脚步声，这是我的冥想时间' },
      { label: 'D', text: '什么都有可能，跑步APP的语音陪练、课程，偶尔也听音乐' },
    ]
  },
  {
    id: 'A30', dimension: 'A5', isSoul: true,
    text: '你觉得你跑步的时候，是什么动物？',
    options: [
      { label: 'A', text: '豹子/猎豹，速度与激情，后程发力冲线' },
      { label: 'B', text: '骆驼，稳健续航，不知道什么叫撞墙' },
      { label: 'C', text: '狐狸，聪明且有策略，每个补给站都精打细算' },
      { label: 'D', text: '蜗牛，慢慢悠悠，但一旦决定出发就会一直爬下去' },
    ]
  },
  // ============ A3 装备与仪式 ============
  {
    id: 'A31', dimension: 'A3', isSoul: false,
    text: '你的跑步装备里，更新最频繁的是哪一类？',
    options: [
      { label: 'A', text: '跑鞋，穿坏一双买一双，每双都要试不同品牌' },
      { label: 'B', text: '运动手表/GPS设备，新款必买，续航精度都要顶配' },
      { label: 'C', text: '运动服装，压缩裤、T恤、帽子、墨镜，衣柜已经塞不下了' },
      { label: 'D', text: '我还没开始买装备，但我的购物车已经加满了一半' },
    ]
  },
  {
    id: 'A32', dimension: 'A3', isSoul: false,
    text: '你对手表/GPS设备的态度是？',
    options: [
      { label: 'A', text: '跑步手表是跑步的核心，没有手表记录的跑步等于没跑' },
      { label: 'B', text: '手机APP就够了，手表是多余的，跑步不应该被数据绑架' },
      { label: 'C', text: '手表是身份的象征，跑步时必须露出我的运动手表' },
      { label: 'D', text: '我一般用手表，但偶尔也会忘记戴，然后整个人都不舒服' },
    ]
  },
  {
    id: 'A33', dimension: 'A3', isSoul: false,
    text: '你的跑步APP/手表里，里程数是多少？',
    options: [
      { label: 'A', text: '1000公里以上，跑步已经成为我生活不可或缺的一部分' },
      { label: 'B', text: '500-1000公里，有自己的节奏，不算多但也不少了' },
      { label: 'C', text: '100-500公里，断断续续在跑，没有很系统' },
      { label: 'D', text: '不知道，我没看过那个数字，跑了就是跑了' },
    ]
  },
  {
    id: 'A34', dimension: 'A4', isSoul: false,
    text: '赛前一天晚上，你的准备工作是什么？',
    options: [
      { label: 'A', text: '装备全部摆好，照片拍好，参赛包整理好，定好三个闹钟' },
      { label: 'B', text: '反复检查号码布有没有别好，芯片有没有绑好，手表充好电' },
      { label: 'C', text: '强迫自己早点睡，但翻来覆去睡不着，脑子里全是赛道' },
      { label: 'D', text: '跟平时一样，该干嘛干嘛，不做任何特殊准备' },
    ]
  },
  {
    id: 'A35', dimension: 'A3', isSoul: false,
    text: '你的跑步衣柜里，最多的跑步装备是什么？',
    options: [
      { label: 'A', text: '跑步T恤，颜色和品牌都不一样，每件都有故事' },
      { label: 'B', text: '压缩裤/紧身裤，各种长度各种品牌各一条' },
      { label: 'C', text: '袜子，跑步袜比普通袜子的花费贵三倍' },
      { label: 'D', text: '奖牌架，我的奖牌已经摆满了一面墙' },
    ]
  },
  {
    id: 'A36', dimension: 'A3', isSoul: false,
    text: '你觉得跑步给你带来了什么？',
    options: [
      { label: 'A', text: '健康，身体指标的改善，这是最实际的' },
      { label: 'B', text: '精神状态的变化，跑步让我更积极、更能抗压了' },
      { label: 'C', text: '朋友圈和社交圈扩大了，认识了更多有趣的人' },
      { label: 'D', text: '带来了一个TBW（to be worn）的奖牌架和一堆不会再穿的压缩袜' },
    ]
  },
  {
    id: 'A37', dimension: 'A3', isSoul: false,
    text: '跑步发朋友圈，你通常什么时候发？',
    options: [
      { label: 'A', text: '跑完就发，趁热，数据最完整，滤镜最到位' },
      { label: 'B', text: '等跑完休息一下，整理一下照片再发，品质优先' },
      { label: 'C', text: '从不发朋友圈，我跑了就是跑了，不需要证明给谁看' },
      { label: 'D', text: '专门挑比赛当天发，蹭热度，运气好能拿赞' },
    ]
  },
  {
    id: 'A38', dimension: 'A3', isSoul: false,
    text: '你买过最值的跑步装备是什么？',
    options: [
      { label: 'A', text: '碳板跑鞋，穿上之后仿佛有了外挂' },
      { label: 'B', text: '运动手表，数据让我更了解自己，也让我更焦虑' },
      { label: 'C', text: '一副好的耳机，跑步不无聊了，人生都升华了' },
      { label: 'D', text: '报名费，报名的那一刻我就已经赢了' },
    ]
  },
  {
    id: 'A39', dimension: 'A3', isSoul: false,
    text: '你最不能接受自己的跑步装备出什么问题？',
    options: [
      { label: 'A', text: '鞋底磨平了还在穿，直到脚底起了水泡才意识到' },
      { label: 'B', text: '手表没电/没GPS信号，导致数据不完整' },
      { label: 'C', text: '短裤的兜太小，手机装不下，这个比赛体验大打折扣' },
      { label: 'D', text: '空顶帽忘带了，头顶被晒得发烫，事后头皮屑暴增' },
    ]
  },
  {
    id: 'A40', dimension: 'A3', isSoul: false,
    text: '如果要你推荐一个跑步装备给新手，你会推荐什么？',
    options: [
      { label: 'A', text: '一双合适的跑鞋，去专业店做步态分析再买' },
      { label: 'B', text: '一双跑步袜，它比鞋更重要' },
      { label: 'C', text: '我会推荐他别买装备，先跑起来再说' },
      { label: 'D', text: '我会推荐一个跑步群，找到组织比买什么装备都重要' },
    ]
  },
  {
    id: 'A41', dimension: 'A3', isSoul: false,
    text: '你对于「赤脚跑」或者「极简跑」怎么看？',
    options: [
      { label: 'A', text: '觉得很酷，但我不敢试，怕脚底中招' },
      { label: 'B', text: '试过一段时间，感觉回到了人类的原始跑步状态' },
      { label: 'C', text: '我觉得这是玄学，跑步就是跑步，不需要搞那么多花样' },
      { label: 'D', text: '看到有人赤脚跑我就会想报警，这不是跑步这是行为艺术' },
    ]
  },
  {
    id: 'A42', dimension: 'A3', isSoul: false,
    text: '你更倾向于在线上跑还是线下跑？',
    options: [
      { label: 'A', text: '线下，赛道的气氛是不可替代的' },
      { label: 'B', text: '线上，跑步不受时间地点限制，更自由' },
      { label: 'C', text: '两者都要，线上用来训练，线下用来比赛和社交' },
      { label: 'D', text: '我参加线上跑是为了奖牌，线下的太远了去不了' },
    ]
  },
  {
    id: 'A43', dimension: 'A3', isSoul: false,
    text: '你的跑步装备中，哪一件是你跑得最久的？',
    options: [
      { label: 'A', text: '一双跑鞋，穿了两三年，鞋底都磨平了还在穿，有感情了' },
      { label: 'B', text: '一件T恤，穿了无数次，洗到褪色了还在穿' },
      { label: 'C', text: '一块手表，戴了很多年，数据比新欢还可靠' },
      { label: 'D', text: '没有任何装备能在我这里待很久，喜新厌旧是常态' },
    ]
  },
  {
    id: 'A44', dimension: 'A3', isSoul: false,
    text: '号码布在你眼里是什么？',
    options: [
      { label: 'A', text: '参赛的凭证，必须平整地别在胸前，不能折' },
      { label: 'B', text: '完赛的证明，完赛后要拍照留念然后收好' },
      { label: 'C', text: '擦汗巾，用完即抛，没那么多讲究' },
      { label: 'D', text: '我有几块号码布，每块都记录了一场不想回忆但忘不掉的比赛' },
    ]
  },
  {
    id: 'A45', dimension: 'A3', isSoul: false,
    text: '你对「强制装备」怎么看？',
    options: [
      { label: 'A', text: '尊重规则，该带的必须带，这是对自己负责' },
      { label: 'B', text: '有些比赛的强制装备是摆设，背着沉重的装备跑才是最大的危险' },
      { label: 'C', text: '我会多带一些，超出强制装备清单的范围，以备不时之需' },
      { label: 'D', text: '强制装备检查是比赛的一部分，作弊的人早晚会在山上付出代价' },
    ]
  },
  // ============ A4 赛前与赛后 ============
  {
    id: 'A46', dimension: 'A4', isSoul: false,
    text: '赛前一周的饮食，你会特别注意吗？',
    options: [
      { label: 'A', text: '会，多吃碳水，保证糖原储备' },
      { label: 'B', text: '不会，跟平时一样，反正跑步消耗大' },
      { label: 'C', text: '会吃清淡一点，怕肠胃在赛道上出问题' },
      { label: 'D', text: '注意了，但没有用，每次到赛道上该拉还是拉' },
    ]
  },
  {
    id: 'A47', dimension: 'A4', isSoul: false,
    text: '比赛前一餐，你一般吃什么？',
    options: [
      { label: 'A', text: '面条/米饭+少量菜，碳水为主，清淡易消化' },
      { label: 'B', text: '跟朋友一起吃大餐，给心理加点油' },
      { label: 'C', text: '赛前两小时吃完，精确计算消化时间' },
      { label: 'D', text: '紧张到吃不下，吃了也感觉不到饱' },
    ]
  },
  {
    id: 'A48', dimension: 'A4', isSoul: false,
    text: '完赛后的第一顿正餐，你一般吃什么？',
    options: [
      { label: 'A', text: '烧烤/火锅，大口吃肉，把跑步消耗的全补回来' },
      { label: 'B', text: '拉面/米粉，清淡为主，让肠胃慢慢恢复' },
      { label: 'C', text: '什么都不想吃，只想喝可乐和睡觉' },
      { label: 'D', text: '随便吃，已经饿过头了，吃什么都不香' },
    ]
  },
  {
    id: 'A49', dimension: 'A4', isSoul: false,
    text: '你会在比赛后多久开始恢复训练？',
    options: [
      { label: 'A', text: '一周以后，等身体完全恢复了再说' },
      { label: 'B', text: '三到五天，开始慢跑，慢慢找回状态' },
      { label: 'C', text: '第二天就跑，不跑浑身难受，跑步已经成瘾了' },
      { label: 'D', text: '说不准，看身体状态，也看心情' },
    ]
  },
  {
    id: 'A50', dimension: 'A3', isSoul: false,
    text: '你的跑鞋通常多久换一双？',
    options: [
      { label: 'A', text: '500-800公里，鞋底磨损了就要换，不能将就' },
      { label: 'B', text: '穿到它散架为止，一双好鞋值得穿到最后一天' },
      { label: 'C', text: '出了新款就想买，旧鞋还没坏就变成了「备用鞋」' },
      { label: 'D', text: '没算过，反正坏了就扔' },
    ]
  },
  {
    id: 'A51', dimension: 'A4', isSoul: false,
    text: '你会在比赛后做什么？',
    options: [
      { label: 'A', text: '拉伸和泡沫轴，用各种工具让身体恢复' },
      { label: 'B', text: '泡澡/冰敷，让身体快速消肿' },
      { label: 'C', text: '睡觉，除了睡觉什么都不想' },
      { label: 'D', text: '发朋友圈，发完朋友圈再拉伸' },
    ]
  },
  {
    id: 'A52', dimension: 'A4', isSoul: false,
    text: '你有没有因为跑步而影响过正常工作/生活？',
    options: [
      { label: 'A', text: '有，跑步占用了我大量的时间，经常需要调整工作安排' },
      { label: 'B', text: '有，跑步让我经常迟到，因为长距离跑完就没时间洗澡了' },
      { label: 'C', text: '没有，跑步让我的效率更高了，工作生活反而更充实' },
      { label: 'D', text: '有，但我觉得值得，工作可以重来，全马一辈子没几次' },
    ]
  },
  {
    id: 'A53', dimension: 'A4', isSoul: false,
    text: '你最常在跑步时想的问题是什么？',
    options: [
      { label: 'A', text: '下一场比赛报哪里' },
      { label: 'B', text: '怎么提高配速' },
      { label: 'C', text: '今天中午吃什么' },
      { label: 'D', text: '什么都不想，让大脑放空' },
    ]
  },
  {
    id: 'A54', dimension: 'A4', isSoul: false,
    text: '跑步时遇到的最尴尬的事是什么？',
    options: [
      { label: 'A', text: '跑到一半抽筋，被人围观' },
      { label: 'B', text: '短裤太透，看到了一个不该看到的轮廓' },
      { label: 'C', text: '跑完了才发现号码布别反了' },
      { label: 'D', text: '在路上遇到前任，还没来得及反应就错过去了' },
    ]
  },
  {
    id: 'A55', dimension: 'A4', isSoul: false,
    text: '跑团约跑，有人一边跑一边聊天，你的反应是？',
    options: [
      { label: 'A', text: '跟着聊，跑量不重要，开心最重要' },
      { label: 'B', text: '聊可以，但别拖慢我的配速，这是底线' },
      { label: 'C', text: '我是来跑步的，不是来社交的，下次不来了' },
      { label: 'D', text: '正好，跟上聊天节奏，顺便当作间歇训练' },
    ]
  },
  {
    id: 'A56', dimension: 'A4', isSoul: false,
    text: '30公里撞墙期，你脑子里在想什么？',
    options: [
      { label: 'A', text: '我是谁我在哪我为什么要跑马拉松' },
      { label: 'B', text: '快点结束吧，求求了，让我走路也行' },
      { label: 'C', text: '掐自己继续跑，不能走，走了就输了' },
      { label: 'D', text: '想到完赛后吃什么，瞬间满血复活' },
    ]
  },
  {
    id: 'A57', dimension: 'A4', isSoul: false,
    text: '你的跑步袜有什么讲究？',
    options: [
      { label: 'A', text: '五指袜，跑完脚指头不会打架' },
      { label: 'B', text: '压缩袜，让血液回流，减少腿部疲劳' },
      { label: 'C', text: '羊毛袜，吸汗保暖，就是有点贵' },
      { label: 'D', text: '便宜袜子，能穿就行' },
    ]
  },
  {
    id: 'A58', dimension: 'A4', isSoul: false,
    text: '比赛中有人超过你，你通常会怎么做？',
    options: [
      { label: 'A', text: '无动于衷，每个人有每个人的配速' },
      { label: 'B', text: '加速跟一段，但很快就会放弃' },
      { label: 'C', text: '默默把对方列入「下次要追上」名单' },
      { label: 'D', text: '我是那个经常被别人超过的人，所以我能理解被超过的感觉' },
    ]
  },
  {
    id: 'A59', dimension: 'A4', isSoul: false,
    text: '你最想跑的一场马拉松/比赛是什么？',
    options: [
      { label: 'A', text: '波士顿马拉松，跑步者心中的圣殿' },
      { label: 'B', text: 'UTMB，终极殿堂，越野跑者的终极目标' },
      { label: 'C', text: '柏林马拉松，世界纪录诞生地，想体验那种赛道' },
      { label: 'D', text: '下一场我已经报名的比赛' },
    ]
  },
  {
    id: 'A60', dimension: 'A4', isSoul: false,
    text: '如果不跑步了，你会用什么来替代？',
    options: [
      { label: 'A', text: '游泳，对关节更友好' },
      { label: 'B', text: '健身，力量训练也是一种修行' },
      { label: 'C', text: '什么都不替代，跑步就是跑步，不需要替代' },
      { label: 'D', text: '躺平，这才是终极的健康生活方式' },
    ]
  },
  // ============ A5 自我认知（ surrealist + 丧逼自嘲 ）============
  {
    id: 'A61', dimension: 'A5', isSoul: false,
    text: '你的跑鞋突然开口说话，它对你说什么？',
    options: [
      { label: 'A', text: '「放过我吧，你已经三个月没给我洗澡了。」' },
      { label: 'B', text: '「前面那个人踩屎了，不是我，是他。」' },
      { label: 'C', text: '「别装了，我知道你今天只打算跑三公里。」' },
      { label: 'D', text: '「我其实很羡慕那双碳板鞋，虽然它连100公里都没跑满。」' },
    ]
  },
  {
    id: 'A62', dimension: 'A5', isSoul: false,
    text: '如果跑步是一场葬礼，你希望终点线摆着什么？',
    options: [
      { label: 'A', text: '一面写满PB的光鲜PB墙，供后人瞻仰' },
      { label: 'B', text: '一张空白的号码布，代表我无数次报名但没中签的人生' },
      { label: 'C', text: '免费的冰可乐和西瓜，来宾边吃边吐槽我跑姿难看' },
      { label: 'D', text: '一个心率带花圈，「愿天堂没有乳酸阈」。' },
    ]
  },
  {
    id: 'A63', dimension: 'A5', isSoul: true,
    text: '你的Garmin数据飘到了平行宇宙，它在那里过着怎样的生活？',
    options: [
      { label: 'A', text: '成了当地的神话：一个每天跑30公里、心率永远136的传奇' },
      { label: 'B', text: '被外星人研究，结论是人类是一种靠自我欺骗存活的动物' },
      { label: 'C', text: '找到了真爱——一块松拓表，它们互相嘲笑对方的APP界面' },
      { label: 'D', text: '失业了，因为那个宇宙的生物根本不运动，练一歇七' },
    ]
  },
  {
    id: 'A64', dimension: 'A5', isSoul: false,
    text: '能量胶成精了，半夜给你发了一条微信，内容是什么？',
    options: [
      { label: 'A', text: '「兄弟，又失眠了？来一口，哥甜的。」' },
      { label: 'B', text: '「别再把我放过期了，上次你以为我在35公里救了你，其实我过期了。」' },
      { label: 'C', text: '「今天赛道见，希望你在能让我发挥作用的时候想起我。」' },
      { label: 'D', text: '「是不是又在看装备了？有那钱不如多囤几盒我。」' },
    ]
  },
  {
    id: 'A65', dimension: 'A5', isSoul: false,
    text: '你在赛道上捡到了一本 racers 的日记，最后一页写着：',
    options: [
      { label: 'A', text: '「第47场马拉松，我终于明白，终点线只是另一条起跑线。」' },
      { label: 'B', text: '「今天没PB，但也没人认识我，所以没关系。」' },
      { label: 'C', text: '「补给站的香蕉是我吃过最好吃的，活着真好。」' },
      { label: 'D', text: '「前面那个人放了一个屁，我跟风跑了三公里，这可能是我的战术巅峰。」' },
    ]
  },
  {
    id: 'A66', dimension: 'A5', isSoul: true,
    text: '深夜，你的奖牌架活了，它对着镜子说了一句话：',
    options: [
      { label: 'A', text: '「这些金属片很轻，但你把它们挂在我脖子上的时候，我觉得喘不过气。」' },
      { label: 'B', text: '「左边第三块奖牌的主人，完赛后哭了。不是感动，是抽筋。」' },
      { label: 'C', text: '「别再添新成员了，架子快塌了，就像你的膝盖一样。」' },
      { label: 'D', text: '「我觉得我很虚荣，但我猜这正是你想要的一切。」' },
    ]
  },
  {
    id: 'A67', dimension: 'A5', isSoul: false,
    text: '你发了一条仅自己可见的朋友圈：「跑步教会了我________。」',
    options: [
      { label: 'A', text: '人生是场马拉松，但我是那个38公里才想起喝水的人' },
      { label: 'B', text: '坚持到底，除了坚持不下去的时候' },
      { label: 'C', text: '买装备比跑步快乐一万倍' },
      { label: 'D', text: '朋友圈没人点赞，但没人点赞我也要跑' },
    ]
  },
  {
    id: 'A68', dimension: 'A5', isSoul: false,
    text: '一位穿着拖鞋的老大爷轻松超过了你，这时你心里想的是？',
    options: [
      { label: 'A', text: '「我这双两千块的鞋在哭，但我礼貌地让它小声点。」' },
      { label: 'B', text: '「他可能不是人类，是天上下凡来嘲笑消费主义的。」' },
      { label: 'C', text: '「没事，他只是在刷步数，而我是在为灵魂燃烧。」' },
      { label: 'D', text: '「等我到了他这个年纪，我也穿人字拖跑全马，吓死年轻人。」' },
    ]
  },
  {
    id: 'A69', dimension: 'A5', isSoul: false,
    text: '你的压缩袜深夜离家出走，是因为？',
    options: [
      { label: 'A', text: '它觉得你的小腿配不上它的压力等级' },
      { label: 'B', text: '它想去跟一个更专业、更会拉伸的脚踝过日子' },
      { label: 'C', text: '它厌倦了每次跑完都被你手忙脚乱地反着脱下来' },
      { label: 'D', text: '其实没走，只是藏在你永远找不到的那只跑鞋里' },
    ]
  },
  {
    id: 'A70', dimension: 'A5', isSoul: true,
    text: '你在梦里参加了一场没有终点的比赛，主办方对你说：',
    options: [
      { label: 'A', text: '「跑不动就别跑了，反正也没有奖牌，只有WiFi密码。」' },
      { label: 'B', text: '「这场比赛的计时芯片在你心里，但你好像已经关机很久了。」' },
      { label: 'C', text: '「前面十公里是上坡，后面全是回忆杀，补给站只有凉白开。」' },
      { label: 'D', text: '「你其实已经完赛47次了，只是每次我们都在你睡着后把终点线拆了。」' },
    ]
  },
  {
    id: 'A71', dimension: 'A5', isSoul: false,
    text: '赛道摄影师拍到了你的人生照片，你的第一反应是？',
    options: [
      { label: 'A', text: '『什么绝美光影，原来我跑步时像在拍运动品牌广告』' },
      { label: 'B', text: '『这不是我，这是埃塞俄比亚在逃公主/王子』' },
      { label: 'C', text: '『表情狰狞得像在参加铁人三项，但腿形意外不错』' },
      { label: 'D', text: '『照片里我的手表屏幕清晰可见：心率183，距离8.47，开悟了』' },
    ]
  },
  {
    id: 'A72', dimension: 'A5', isSoul: false,
    text: '如果有一天跑步变成了违禁行为，你觉得自己会？',
    options: [
      { label: 'A', text: '成立地下跑团组织，接头暗号是「今天你乳酸堆积了吗」' },
      { label: 'B', text: '转行当跑步主播，用「快走」的名义偷偷摇手臂' },
      { label: 'C', text: '彻底躺平，既然禁止了那我也正好有理由不跑了' },
      { label: 'D', text: '移民到一个跑步合法的国家，比如公园大爷较多的小区' },
    ]
  },
  {
    id: 'A73', dimension: 'A5', isSoul: true,
    text: '跑步APP弹出一个你从未见过的成就徽章，上面写着：',
    options: [
      { label: 'A', text: '「连续三个月没有PB，但你还在坚持——这本身就是奇迹。」' },
      { label: 'B', text: '「你的年跑量打败了全国0.3%的跑者，以及全国99.7%的沙发。」' },
      { label: 'C', text: '「你曾在凌晨五点开跑，原因只是睡不着。这很棒吗？不，但这是你。」' },
      { label: 'D', text: '「恭喜解锁隐藏成就：『跑得不多，但想得很美』。」' },
    ]
  },
  // ============ A1 动机与身份认同（跑圈meme + 阴阳怪气）============
  {
    id: 'A74', dimension: 'A1', isSoul: false,
    text: '你跑步的动力80%来自？',
    options: [
      { label: 'A', text: '想在朋友圈出现「这人怎么又去跑步了」的感叹' },
      { label: 'B', text: '体检报告上的箭头比我的跑量还多，不跑不行了' },
      { label: 'C', text: '羡慕某个网红跑者的生活，幻想自己跑多了也能接到广告' },
      { label: 'D', text: '没什么动力，我就是贱，不跑会焦虑，跑了会累' },
    ]
  },
  {
    id: 'A75', dimension: 'A1', isSoul: false,
    text: '有人评论你「跑得又不快，发什么跑步数据」，你的回应是？',
    options: [
      { label: 'A', text: '拉黑删除，我的世界不需要这种没有热身心率的人' },
      { label: 'B', text: '微微一笑，下次专门发一条仅他可见的10公里截图' },
      { label: 'C', text: '回复「你说得对」，但心里已经和他在评论区大战三百回合' },
      { label: 'D', text: '根本不回复，真正的强者连解释都觉得浪费糖原' },
    ]
  },
  {
    id: 'A76', dimension: 'A1', isSoul: false,
    text: '你的跑步人设是什么？',
    options: [
      { label: 'A', text: '勤奋打卡鸡：每天5点起床晨跑，配图必有日出和海盐' },
      { label: 'B', text: '佛系幽灵跑：一年跑三回，但装备永远是当季新款' },
      { label: 'C', text: '伤痛文学跑：每次发动态都在反思人生，配速不快但金句多' },
      { label: 'D', text: '数据刺客：表面「随便跑跑」，实际每场都精心准备战术表' },
    ]
  },
  {
    id: 'A77', dimension: 'A1', isSoul: false,
    text: '你跑步的最终目的是？',
    options: [
      { label: 'A', text: '活到领退休金那天，跑步是让我社保不白交的手段' },
      { label: 'B', text: '集齐六大满贯，不是为了跑步，是为了和别人聊天有谈资' },
      { label: 'C', text: '减肥——虽然跑了五年也没瘦，但反正不归牛顿管' },
      { label: 'D', text: '寻找人生的意义，目前进度：跑步3200公里，意义0%' },
    ]
  },
  // ============ A2 赛道行为模式（absurd race behavior）============
  {
    id: 'A78', dimension: 'A2', isSoul: false,
    text: '撞墙期时，你会对路边的什么东西产生幻觉？',
    options: [
      { label: 'A', text: '补给站的桌子变成了我外婆家的餐桌，上面有一碗红烧肉' },
      { label: 'B', text: '终点拱门其实是 arbitrary 的工作邮箱，跑过去就能辞职' },
      { label: 'C', text: '路边的志愿者全是我的小学同学，他们在喊我大名给我加油' },
      { label: 'D', text: '自己的影子领先我五十米，我知道它在嘲讽我' },
    ]
  },
  {
    id: 'A79', dimension: 'A2', isSoul: false,
    text: '你在补给站拿水时，手一抖全泼在了旁边选手身上，你会？',
    options: [
      { label: 'A', text: '立刻道歉并陪跑三公里，直到对方原谅或甩掉我' },
      { label: 'B', text: '假装不是我，顺手抓第二杯继续喝，头也不回地跑了' },
      { label: 'C', text: '大喊「我是你今天的降温志愿者！」然后加速逃离现场' },
      { label: 'D', text: '愣在原地思考人生，直到被后面的人撞醒' },
    ]
  },
  {
    id: 'A80', dimension: 'A2', isSoul: false,
    text: '冲刺阶段有人张开双臂想要跟你击掌，你的反应是？',
    options: [
      { label: 'A', text: '精准闪避，「对不起，我今天的步频不允许任何社交行为」' },
      { label: 'B', text: '用力击掌，结果两人同时失去平衡，一起滚过了终点线' },
      { label: 'C', text: '假装没看见，内心OS：「你谁？我认识你吗配速多少？」' },
      { label: 'D', text: '击掌并大喊「一起加油！」——虽然说完自己就岔气了' },
    ]
  },
  {
    id: 'A81', dimension: 'A2', isSoul: false,
    text: 'Aid station的大喇叭正在播放你最讨厌的歌，你会？',
    options: [
      { label: 'A', text: '边跑边骂DJ，把这段路当作节奏训练，用脚打反拍' },
      { label: 'B', text: '放慢脚步听完再走，毕竟这可能是你唯一一次欣赏它的机会' },
      { label: 'C', text: '这首歌让你充满恨意，不知不觉PB了恨意驱动型跑者' },
      { label: 'D', text: '跟志愿者说「切歌」，虽然知道他根本不会理你' },
    ]
  },
  // ============ A3 装备与仪式（gear obsession mocked）============
  {
    id: 'A82', dimension: 'A3', isSoul: false,
    text: '你的Garmin表盘提醒「今日建议休息」，你会？',
    options: [
      { label: 'A', text: '无视它，电子产品懂什么人类的意志力' },
      { label: 'B', text: '听从它，并且额外午睡一小时，把它当圣旨供起来' },
      { label: 'C', text: '把它卸载重装，假装我是第一次用这块表' },
      { label: 'D', text: '跑完回家给它充电，边充边说「下次再说实话我就换Apple Watch」' },
    ]
  },
  {
    id: 'A83', dimension: 'A3', isSoul: false,
    text: '你新买了一双限量配色跑鞋，第一次穿出门时的心情是？',
    options: [
      { label: 'A', text: '像皇帝登基，每一步都在接受路人的臣服礼' },
      { label: 'B', text: '小心翼翼避开所有水坑，回家立刻用牙刷刷鞋底' },
      { label: 'C', text: '故意放慢配速，让更多人有机会看清鞋面上的联名logo' },
      { label: 'D', text: '穿了才发现磨脚后跟，现在它唯一的用处是放在鞋柜里发光' },
    ]
  },
  {
    id: 'A84', dimension: 'A3', isSoul: false,
    text: '你的号码布收藏册里，最珍贵的一张是因为？',
    options: [
      { label: 'A', text: '它是你唯一一次中签名额，别的都是花钱买的慈善名额' },
      { label: 'B', text: '上面的芯片没拆，留作「下次也许还能刷进门」的念想' },
      { label: 'C', text: '号码是你的生日，你觉得组委会暗恋你' },
      { label: 'D', text: '那次比赛你跑了最后一名，完赛后仍有饭吃，是真正的人文关怀' },
    ]
  },
  {
    id: 'A85', dimension: 'A3', isSoul: false,
    text: '你对压缩袜的态度是？',
    options: [
      { label: 'A', text: '没有它我无法起床跑步，医学上和心理上都是如此' },
      { label: 'B', text: '坚信它只是心理安慰，但还是会买最贵的款式' },
      { label: 'C', text: '觉得穿上像火腿肠，但为了恢复效果我愿意当火腿肠' },
      { label: 'D', text: '从来不穿，我的血管自己就有觉悟' },
    ]
  },
  // ============ A4 赛前与赛后（surreal pre/post race）============
  {
    id: 'A86', dimension: 'A4', isSoul: false,
    text: '赛前一周你突然想吃某种奇怪的东西，它是？',
    options: [
      { label: 'A', text: '十全大补汤里的那颗红枣，我觉得它在召唤我' },
      { label: 'B', text: '小学门口五毛钱的辣条，身体和灵魂都需要回忆杀' },
      { label: 'C', text: '冰块，什么都不加，只想咀嚼一种不可食用的坚硬' },
      { label: 'D', text: '中链脂肪酸胶囊拌沙拉——虽然我根本不知道那是什么味道' },
    ]
  },
  {
    id: 'A87', dimension: 'A4', isSoul: false,
    text: '完赛后你在酒店里醒来，第一反应是？',
    options: [
      { label: 'A', text: '摸大腿，确认它还在，并且正在以一种奇怪的频率抖动' },
      { label: 'B', text: '打开手机看成绩，虽然已经在脑海里背了八百遍' },
      { label: 'C', text: '闻房间里的味道，怀疑这是 human-sweat 主题的沉浸式酒店' },
      { label: 'D', text: '盯着天花板想：「我现在退房还是再躺到太阳下山？」' },
    ]
  },
  {
    id: 'A88', dimension: 'A4', isSoul: false,
    text: '为了平衡跑步和生活，你做出的最大牺牲是？',
    options: [
      { label: 'A', text: '把约会安排在跑完步之后，导致对方闻了我这辈子最真实的味道' },
      { label: 'B', text: '用年会抽奖运气换来了比赛中签，同事以为我中的是电动车' },
      { label: 'C', text: '为了晨跑放弃周六晚上的一切社交，朋友以为我进了传销' },
      { label: 'D', text: '其实没有牺牲，因为我的生活已经基本被跑步吃完了' },
    ]
  },
  {
    id: 'A89', dimension: 'A4', isSoul: false,
    text: '赛后恢复期间，你最常做的「康复训练」是？',
    options: [
      { label: 'A', text: '躺着刷别人跑步的视频，用意念参加虚拟恢复跑' },
      { label: 'B', text: '在购物车里加入三双新鞋，通过消费刺激血液循环' },
      { label: 'C', text: '跟每一个没跑的人说这次有多累，用说话排乳酸' },
      { label: 'D', text: '睡觉，做梦梦见自己又在跑，然后惊醒确认腿还在' },
    ]
  },
]
