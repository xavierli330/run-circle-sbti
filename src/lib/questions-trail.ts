import { Question } from './types'

export const trailQuestions: Question[] = [
  // ============ B1 吃苦与享乐 ============
  {
    id: 'B1', dimension: 'B1', isSoul: false,
    text: '越野跑最吸引你的是什么？',
    options: [
      { label: 'A', text: '在山里独处，比在家躺着还自在' },
      { label: 'B', text: '自虐的快感，跑完感觉自己是个烈士' },
      { label: 'C', text: '补给站的热食，那是用汗水换来的米其林' },
      { label: 'D', text: '迷路时跟自己对话的刺激感' },
    ]
  },
  {
    id: 'B2', dimension: 'B1', isSoul: false,
    text: '50公里以上的组别，你最担心什么？',
    options: [
      { label: 'A', text: '脚指甲黑掉三个，回家被老婆骂' },
      { label: 'B', text: '迷路后在山上过夜，第二天上新闻' },
      { label: 'C', text: '补给站的小姐姐看我的号码簿憋笑' },
      { label: 'D', text: '跑到一半想吃火锅，结果退赛' },
    ]
  },
  {
    id: 'B3', dimension: 'B1', isSoul: false,
    text: '你对"自补给"怎么看？',
    options: [
      { label: 'A', text: '精英选手的人设，我等凡人还是进站吧' },
      { label: 'B', text: '进站必吃撑，不然觉得对不起报名费' },
      { label: 'C', text: '我背的吃的比组委会补给还多' },
      { label: 'D', text: '自补给是反人性的，跑步已经够苦了' },
    ]
  },
  {
    id: 'B4', dimension: 'B1', isSoul: false,
    text: '在山野里迷路，你的第一反应是什么？',
    options: [
      { label: 'A', text: '打开手机看轨迹，发现信号也没有' },
      { label: 'B', text: '焦虑到原地跺脚，然后认命往回走' },
      { label: 'C', text: '无所谓，反正条条大路通罗马，大不了通火葬场' },
      { label: 'D', text: '等有缘人经过，顺便嘲笑一下他们的路痴' },
    ]
  },
  {
    id: 'B5', dimension: 'B1', isSoul: false,
    text: '遇到恶劣天气（下暴雨/大雾/妖风），你会？',
    options: [
      { label: 'A', text: '继续前进，反正冲锋衣够贵，不能浪费' },
      { label: 'B', text: '停下来等天气好转，顺便思考人生' },
      { label: 'C', text: '果断退赛，我可不想成为山神的祭品' },
      { label: 'D', text: '感谢自己的强制装备，感觉自己是个生存专家' },
    ]
  },
  {
    id: 'B6', dimension: 'B1', isSoul: false,
    text: '周末约伴跑山，你prefer什么路线？',
    options: [
      { label: 'A', text: '有烤肠有雪糕的路线，爬坡不重要，吃的到位才是yyds' },
      { label: 'B', text: '风景好的路线，可以停下来拍照，出片率第一' },
      { label: 'C', text: '能刷PB的路线，下山要快，烤肉要香' },
      { label: 'D', text: '难度大的路线，要的就是这种上强度的感觉' },
    ]
  },
  {
    id: 'B7', dimension: 'B1', isSoul: false,
    text: '100公里比赛，最怕哪个阶段？',
    options: [
      { label: 'A', text: '50公里处，身体开始叛变' },
      { label: 'B', text: '夜跑阶段，困到对着树说话' },
      { label: 'C', text: '最后10公里，天亮了但灵魂已经出窍' },
      { label: 'D', text: '发朋友圈的时候，不知道该怎么卖惨' },
    ]
  },
  {
    id: 'B8', dimension: 'B1', isSoul: true,
    text: '有人说"越野跑是跑给山看的"，你怎么看？',
    options: [
      { label: 'A', text: '山又看不懂，我是跑给自己看的' },
      { label: 'B', text: '山看完就忘，朋友圈记住才是真的' },
      { label: 'C', text: '补给站才是终点，续命才是真谛' },
      { label: 'D', text: '跑到最后才发现，山一直在，人没了' },
    ]
  },
  {
    id: 'B9', dimension: 'B1', isSoul: false,
    text: 'CP点关门时间意味着什么？',
    options: [
      { label: 'A', text: '压力山大，但也是肾上腺素来源' },
      { label: 'B', text: '我从来没被关过门，因为我从来没完赛过' },
      { label: 'C', text: '每次卡点进站，玩的是心跳和膝盖' },
      { label: 'D', text: '关门时间是组委会定的，跟我没关系' },
    ]
  },
  {
    id: 'B10', dimension: 'B1', isSoul: false,
    text: '越野赛前一晚，你在干什么？',
    options: [
      { label: 'A', text: '检查装备三遍，强迫症发作，闹钟定5个，号码布别了又拆' },
      { label: 'B', text: '该吃吃该喝喝，正常作息，相信训练，淡定如佛' },
      { label: 'C', text: '失眠到2点，脑子里全是赛道，爬升数据在眼前飘' },
      { label: 'D', text: '在群里水群，跟别人对线讨论装备，顺便把别人也聊焦虑了' },
    ]
  },
  {
    id: 'B11', dimension: 'B1', isSoul: false,
    text: 'DNF（未完赛）对你来说意味着什么？',
    options: [
      { label: 'A', text: '失败，下次一定复仇' },
      { label: 'B', text: '正常，越野跑的必修课' },
      { label: 'C', text: '羞耻，假装从没报过这场比赛' },
      { label: 'D', text: '退款？不，是押金打水漂' },
    ]
  },
  {
    id: 'B12', dimension: 'B1', isSoul: true,
    text: '你会提前告诉家人你要去跑越野吗？',
    options: [
      { label: 'A', text: '会，还要写遗书那种' },
      { label: 'B', text: '简单说一下，报喜不报忧' },
      { label: 'C', text: '不说，说了他们也不懂，以为我只是去爬山' },
      { label: 'D', text: '已经不敢说了，毕竟DNF过一次' },
    ]
  },
  // ============ B2 装备与强制 ============
  {
    id: 'B13', dimension: 'B2', isSoul: false,
    text: '强制装备检查时，你是什么心态？',
    options: [
      { label: 'A', text: '严格自查，每一克都要符合组委会要求' },
      { label: 'B', text: '走过场，反正检查的人也不会那么认真' },
      { label: 'C', text: '多带点，超出清单才有安全感' },
      { label: 'D', text: '经历过装备不足被罚时，再也不敢侥幸' },
    ]
  },
  {
    id: 'B14', dimension: 'B2', isSoul: false,
    text: '轻量化装备 vs 全面的装备，你怎么选？',
    options: [
      { label: 'A', text: '越轻越好，每克都是对膝盖的救赎' },
      { label: 'B', text: '够用就行，在作死和安全之间找平衡' },
      { label: 'C', text: '全面优先，宁可重也不要山顶受冻' },
      { label: 'D', text: '看比赛难度，难了就全带，简单就裸奔' },
    ]
  },
  {
    id: 'B15', dimension: 'B2', isSoul: false,
    text: '越野跑鞋，你最在意什么？',
    options: [
      { label: 'A', text: '防滑性，湿滑路面是最大的死神' },
      { label: 'B', text: '轻量化，每克都是肺的负担' },
      { label: 'C', text: '耐久性，越野路面一天废一双' },
      { label: 'D', text: '外观，好看才有动力跑' },
    ]
  },
  {
    id: 'B16', dimension: 'B2', isSoul: false,
    text: '你的越野背包里，必带的四件东西是什么？',
    options: [
      { label: 'A', text: '水袋、冲锋衣、头灯、轨迹图' },
      { label: 'B', text: '手机、充电宝、零食、备用袜子' },
      { label: 'C', text: '不知道，反正有空位就塞' },
      { label: 'D', text: '我不用背包，我用的是腰包，虽然很不专业' },
    ]
  },
  {
    id: 'B17', dimension: 'B2', isSoul: false,
    text: '你对头灯的态度是？',
    options: [
      { label: 'A', text: '必带！还要带备用的，防止没电变睁眼瞎' },
      { label: 'B', text: '只带一个，满电，轻才是王道' },
      { label: 'C', text: '组委会要求才带，平时觉得多余' },
      { label: 'D', text: '不带头灯，借着月光修仙' },
    ]
  },
  {
    id: 'B18', dimension: 'B2', isSoul: false,
    text: '下雨天跑越野，你会特别注意什么？',
    options: [
      { label: 'A', text: '鞋的防滑性，滑倒比抽筋更致命' },
      { label: 'B', text: '保暖，冲锋衣是最后的防线' },
      { label: 'C', text: '电子产品的防水，手机比命重要' },
      { label: 'D', text: '直接退赛，雨战是给不要命的人准备的' },
    ]
  },
  {
    id: 'B19', dimension: 'B2', isSoul: false,
    text: '你的登山杖使用频率是？',
    options: [
      { label: 'A', text: '每次长距离必带，没有它我就没有灵魂' },
      { label: 'B', text: '看赛道，有大爬升才用' },
      { label: 'C', text: '不喜欢用，拿着碍事，还容易被骂装备党' },
      { label: 'D', text: '没用过，买了就是为了在家放着' },
    ]
  },
  {
    id: 'B20', dimension: 'B2', isSoul: false,
    text: '你的运动相机（GoPro等）在跑步时会用吗？',
    options: [
      { label: 'A', text: '经常用，记录每一个"生死时刻"' },
      { label: 'B', text: '偶尔用，只在风景好的地方装一下' },
      { label: 'C', text: '不带，已经够累了，不想再背烧火棍' },
      { label: 'D', text: '有，但从来没在跑步时用过，当摆件了' },
    ]
  },
  {
    id: 'B21', dimension: 'B2', isSoul: false,
    text: '你对跑步眼镜怎么看？',
    options: [
      { label: 'A', text: '防紫外线防风防树枝，山里必备' },
      { label: 'B', text: '就是装饰品，戴着显得专业' },
      { label: 'C', text: '从来不带，戴了感觉像外星人' },
      { label: 'D', text: '我带墨镜冒充跑步眼镜' },
    ]
  },
  {
    id: 'B22', dimension: 'B2', isSoul: false,
    text: '你会在越野跑时穿什么袜子？',
    options: [
      { label: 'A', text: '五指袜，防止脚趾踩踏事件' },
      { label: 'B', text: '压缩袜，包裹性好还能当护具' },
      { label: 'C', text: '羊毛袜，吸汗保暖又耐操' },
      { label: 'D', text: '普通运动袜，越野不需要那么讲究' },
    ]
  },
  {
    id: 'B23', dimension: 'B2', isSoul: false,
    text: '你有没有在强制装备上省过钱？',
    options: [
      { label: 'A', text: '没有，该花的花，命比钱贵' },
      { label: 'B', text: '有，买了个便宜冲锋衣，在山上冻成狗' },
      { label: 'C', text: '有，头灯买的最便宜的，差点夜奔黄泉' },
      { label: 'D', text: '一双鞋穿了两场百公里，鞋底都磨平了' },
    ]
  },
  {
    id: 'B24', dimension: 'B2', isSoul: true,
    text: '你最喜欢的越野装备品牌是什么？',
    options: [
      { label: 'A', text: 'Salomon，轻量化越野的信仰' },
      { label: 'B', text: 'HOKA，厚底让我觉得自己能飞' },
      { label: 'C', text: '凯乐石，国货之光，性价比之王' },
      { label: 'D', text: '我不挑品牌，哪个骨折买哪个' },
    ]
  },
  // ============ B3 爬升与技术 ============
  {
    id: 'B25', dimension: 'B3', isSoul: false,
    text: '看到赛道图上的爬升数据，你的第一反应是什么？',
    options: [
      { label: 'A', text: '这爬升...能坐车上去吗？' },
      { label: 'B', text: '先算算爬升距离比，评估会不会死人' },
      { label: 'C', text: '后悔报名，但钱都交了' },
      { label: 'D', text: '无所谓，反正都是走上去的' },
    ]
  },
  {
    id: 'B26', dimension: 'B3', isSoul: false,
    text: '遇到长距离爬升，你会怎么应对？',
    options: [
      { label: 'A', text: '走上去，越野跑比的是谁走得快' },
      { label: 'B', text: '保持稳定配速，不冲，才能苟到最后' },
      { label: 'C', text: '跟别人聊天，互相催眠，不知不觉就到了' },
      { label: 'D', text: '听音乐播客，让爬升不那么像酷刑' },
    ]
  },
  {
    id: 'B27', dimension: 'B3', isSoul: false,
    text: '陡坡下山时，你是什么状态？',
    options: [
      { label: 'A', text: '小步快频控制重心，享受坠落的快感' },
      { label: 'B', text: '小心翼翼走着，跑起来怕刹不住车' },
      { label: 'C', text: '跑下去！哪怕膝盖已经发出求救信号' },
      { label: 'D', text: '用登山杖支撑，减轻膝盖的控诉' },
    ]
  },
  {
    id: 'B28', dimension: 'B3', isSoul: true,
    text: '你怎么看待"跑山"这个说法？',
    options: [
      { label: 'A', text: '跑山是精髓，下山跑起来才是爽' },
      { label: 'B', text: '上山跑不了，下山还跑不了，那叫爬山' },
      { label: 'C', text: '我更喜欢"走山"，走比跑更可持续' },
      { label: 'D', text: '跑到最后才发现，其实是在赶路' },
    ]
  },
  {
    id: 'B29', dimension: 'B3', isSoul: false,
    text: '连续爬升超过1000米，你的身体会有什么反应？',
    options: [
      { label: 'A', text: '腿软如泥，但还能苟延残喘' },
      { label: 'B', text: '大口喘气，肺已经报警' },
      { label: 'C', text: '心情变差，怀疑人生为何要来受罪' },
      { label: 'D', text: '无所谓，反正已经麻了' },
    ]
  },
  {
    id: 'B30', dimension: 'B3', isSoul: false,
    text: '爬升和距离，哪个更让你焦虑？',
    options: [
      { label: 'A', text: '爬升，爬升越狠身体越遭罪' },
      { label: 'B', text: '距离，距离长才是对意志的摧残' },
      { label: 'C', text: '两个都焦虑，一个是体力，一个是时间' },
      { label: 'D', text: '关门时间才是焦虑的根源' },
    ]
  },
  {
    id: 'B31', dimension: 'B3', isSoul: false,
    text: '遇到技术路段（岩石、树根、陡坡），你会？',
    options: [
      { label: 'A', text: '小心翼翼通过，命是自己的' },
      { label: 'B', text: '尝试跑过去，我觉得我行（通常不行）' },
      { label: 'C', text: '停下来观察，想好再走，减少摔跤概率' },
      { label: 'D', text: '跟在有经验的人后面，看他们怎么表演' },
    ]
  },
  {
    id: 'B32', dimension: 'B3', isSoul: false,
    text: '你会为了减少爬升而绕远路吗？',
    options: [
      { label: 'A', text: '会，安全比距离重要' },
      { label: 'B', text: '不会，近路再难也是近路' },
      { label: 'C', text: '看情况，陡坡就算了' },
      { label: 'D', text: '我不爬坡，我只爬升' },
    ]
  },
  {
    id: 'B33', dimension: 'B3', isSoul: false,
    text: '你怎么看"爬山虎"（爬山很快的人）？',
    options: [
      { label: 'A', text: '佩服，但我不跟他们比，我有我自己的节奏' },
      { label: 'B', text: '无感，上山快不代表下山也快' },
      { label: 'C', text: '我就是爬山虎，爬山是我的强项' },
      { label: 'D', text: '想成为他们，但腿不允许' },
    ]
  },
  {
    id: 'B34', dimension: 'B3', isSoul: false,
    text: '你的爬升训练方式是什么？',
    options: [
      { label: 'A', text: '跑楼梯，每周固定几次，膝盖在尖叫' },
      { label: 'B', text: '去山里实际练习，虽然很远很麻烦' },
      { label: 'C', text: '没有特意练，比赛中自然就有爬升了' },
      { label: 'D', text: '我住在山里，出门就是爬升，太凡了' },
    ]
  },
  {
    id: 'B35', dimension: 'B3', isSoul: false,
    text: '你更喜欢上坡还是下坡？',
    options: [
      { label: 'A', text: '上坡，考验意志力，成就感更强' },
      { label: 'B', text: '下坡，炫技的时候，飞奔的感觉爽' },
      { label: 'C', text: '都喜欢，越野的魅力就在于此' },
      { label: 'D', text: '都不喜欢，我喜欢坐缆车' },
    ]
  },
  {
    id: 'B36', dimension: 'B3', isSoul: true,
    text: '你觉得爬升给你的最大收获是什么？',
    options: [
      { label: 'A', text: '意志力的磨炼，爬完觉得人生没什么过不去' },
      { label: 'B', text: '看风景，站得高看得远，朋友圈素材多' },
      { label: 'C', text: '跑步能力的提升，爬过山就知道平地多幸福' },
      { label: 'D', text: '没什么收获，就是喜欢受罪' },
    ]
  },
  // ============ B4 风景与完赛 ============
  {
    id: 'B37', dimension: 'B4', isSoul: false,
    text: '越野跑时遇到绝美风景，你会？',
    options: [
      { label: 'A', text: '必须停下来拍照，哪怕被关门' },
      { label: 'B', text: '边跑边拍，技术难度高但我不放弃' },
      { label: 'C', text: '强迫自己不停，用眼睛记住就够了' },
      { label: 'D', text: '问旁边的人要照片，省时间' },
    ]
  },
  {
    id: 'B38', dimension: 'B4', isSoul: false,
    text: '你朋友圈的越野跑照片通常是什么风格？',
    options: [
      { label: 'A', text: '精修过的，赛道风景+精算角度+完美光线' },
      { label: 'B', text: '累到崩溃的丑照，反差感才吸引眼球' },
      { label: 'C', text: '只有完赛证书和奖牌，假装很专业' },
      { label: 'D', text: '不发朋友圈，用跑步APP记录' },
    ]
  },
  {
    id: 'B39', dimension: 'B4', isSoul: false,
    text: '拍照耽误了比赛，你会后悔吗？',
    options: [
      { label: 'A', text: '不会，风景错过了就没了，比赛明年还有' },
      { label: 'B', text: '会，下次一定要管住手' },
      { label: 'C', text: '取决于拍得好不好看，好看就不后悔' },
      { label: 'D', text: '我跑得慢，不在乎那几分钟' },
    ]
  },
  {
    id: 'B40', dimension: 'B4', isSoul: false,
    text: '你觉得越野跑的魅力，一半在于风景吗？',
    options: [
      { label: 'A', text: '完全是，风景是越野跑的灵魂' },
      { label: 'B', text: '不绝对是，挑战自我的快感更重要' },
      { label: 'C', text: '风景只占30%，其他占70%' },
      { label: 'D', text: '我跑越野就是为了看风景' },
    ]
  },
  {
    id: 'B41', dimension: 'B4', isSoul: false,
    text: '你会在哪些地方停下来拍照？',
    options: [
      { label: 'A', text: '每个补给站，打卡留念证明我来过' },
      { label: 'B', text: '每个山顶，视野最好必须拍' },
      { label: 'C', text: '遇到野生动物，这种机会不多' },
      { label: 'D', text: '终点拱门前，最重要的仪式感' },
    ]
  },
  {
    id: 'B42', dimension: 'B4', isSoul: false,
    text: '对"跑到一半停下来拍照"的跑者怎么看？',
    options: [
      { label: 'A', text: '理解，风景是越野跑的一部分' },
      { label: 'B', text: '觉得他们不专业，浪费时间' },
      { label: 'C', text: '我就是这样的人，我觉得很正常' },
      { label: 'D', text: '我会等他们拍完再走，避免尴尬' },
    ]
  },
  {
    id: 'B43', dimension: 'B4', isSoul: false,
    text: '你的手机在比赛时用来做什么？',
    options: [
      { label: 'A', text: '拍照，记录每一个不想忘记的瞬间' },
      { label: 'B', text: '导航，看轨迹确认自己没走错' },
      { label: 'C', text: '发朋友圈，记录实时进度博同情' },
      { label: 'D', text: '偶尔看时间，计算还有多久能到终点' },
    ]
  },
  {
    id: 'B44', dimension: 'B4', isSoul: false,
    text: '完赛后，你最想做什么？',
    options: [
      { label: 'A', text: '发朋友圈，告诉大家我还活着' },
      { label: 'B', text: '找地方吃饭，饿到可以吃下一头牛' },
      { label: 'C', text: '拉伸睡觉，身体已经不属于自己了' },
      { label: 'D', text: '分析数据，看看这次拖了谁的后腿' },
    ]
  },
  {
    id: 'B45', dimension: 'B4', isSoul: false,
    text: '你觉得一张好的赛道照片应该包含什么？',
    options: [
      { label: 'A', text: '跑者本人，要有脸，不然谁知道是我' },
      { label: 'B', text: '赛道风景，要能看到山和天空' },
      { label: 'C', text: '数据截图，配速和爬升，这才是实力' },
      { label: 'D', text: '奖牌特写，最重要的成就符号' },
    ]
  },
  {
    id: 'B46', dimension: 'B4', isSoul: false,
    text: '如果你只有一次机会拍一张赛道照片，你会拍什么？',
    options: [
      { label: 'A', text: '终点冲线的那一刻，荣耀瞬间' },
      { label: 'B', text: '山顶的360度全景，不留遗憾' },
      { label: 'C', text: '补给站志愿者的笑脸，感恩' },
      { label: 'D', text: '完赛后的奖牌特写，回报朋友圈' },
    ]
  },
  {
    id: 'B47', dimension: 'B4', isSoul: false,
    text: '完赛后你会做什么恢复活动？',
    options: [
      { label: 'A', text: '拉伸+泡沫轴+冰敷全套，自虐继续' },
      { label: 'B', text: '去按摩店，让专业人士收拾残骸' },
      { label: 'C', text: '睡觉，睡一天都不够' },
      { label: 'D', text: '泡温泉热敷，让身体慢慢复活' },
    ]
  },
  {
    id: 'B48', dimension: 'B4', isSoul: false,
    text: '你的家人/伴侣支持你跑越野吗？',
    options: [
      { label: 'A', text: '完全支持，还会给我加油' },
      { label: 'B', text: '表面支持，实际上觉得我在浪费时间' },
      { label: 'C', text: '不支持，觉得我在玩命' },
      { label: 'D', text: '无所谓，反正不花他们的钱' },
    ]
  },
  {
    id: 'B49', dimension: 'B4', isSoul: true,
    text: '你觉得跑越野给你带来了什么改变？',
    options: [
      { label: 'A', text: '身体更健康了，这是最直接的' },
      { label: 'B', text: '认识了很多有趣的人，圈子大了' },
      { label: 'C', text: '变得更自律了，越野改变了生活习惯' },
      { label: 'D', text: '没什么改变，但它让我接受了自己' },
    ]
  },
  {
    id: 'B50', dimension: 'B4', isSoul: true,
    text: '展望未来，你对越野跑有什么期待？',
    options: [
      { label: 'A', text: '完成一场百公里，这是我的朝圣' },
      { label: 'B', text: '跑遍全国的山，打卡每一个赛道' },
      { label: 'C', text: '稳定保持现状，不追求更多' },
      { label: 'D', text: '带更多人一起跑，让越野成为生活方式' },
    ]
  },
]
