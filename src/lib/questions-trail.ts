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
    text: '如果补给站除了常规补给外，还提供一项「神秘补给」，你会选？',
    options: [
      { label: 'A', text: '一位会讲脱口秀的志愿者，边补给边给你讲段子提神' },
      { label: 'B', text: '一个可以帮你发朋友圈的代写服务，文案自带精修滤镜' },
      { label: 'C', text: '一份「退赛同意书」签字版，附赠叫车服务优惠券' },
      { label: 'D', text: '一张来自终点的全息投影奖牌，让你提前享受完赛的快感' },
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
    text: '暴雨中你的冲锋衣突然开口说话，它说：',
    options: [
      { label: 'A', text: '「我防的是水，不是你的人类泪水，别哭了。」' },
      { label: 'B', text: '「这件衣服的防水指数只能再坚持3公里，请珍惜我。」' },
      { label: 'C', text: '「其实我里面已经湿透了，但我还在假装坚强。」' },
      { label: 'D', text: '「你买我的时候不是说只跑晴天吗？骗子。」' },
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
    text: '有人说「越野跑是跑给山看的」，你怎么看？',
    options: [
      { label: 'A', text: '山又看不懂，我是跑给自己看的' },
      { label: 'B', text: '山看完就忘，朋友圈记住才是真的' },
      { label: 'C', text: '补给站才是终点，续命才是真谛' },
      { label: 'D', text: '跑到最后才发现，山一直在，人没了' },
    ]
  },
  {
    id: 'B9', dimension: 'B1', isSoul: false,
    text: '如果CP点的志愿者其实是你的前任假扮的，ta对你说「加油」，你会？',
    options: [
      { label: 'A', text: '咬牙切齿地加速冲出去，证明「离开你我能跑得更快」' },
      { label: 'B', text: '当场愣住，然后问ta：「你是不是故意在这里等我退赛的？」' },
      { label: 'C', text: '若无其事地拿补给，但手抖到把可乐全泼在了号码布上' },
      { label: 'D', text: '掏出手机合影，配文「最好的前任，是我PB路上的志愿者」' },
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
    text: '如果今年的强制装备清单里新增了一项「一只活鸡」，你会？',
    options: [
      { label: 'A', text: '认真去农贸市场挑选一只性格温顺、体重轻的鸡' },
      { label: 'B', text: '买一只橡胶鸡充数，反正检查员不会捏它' },
      { label: 'C', text: '直接弃赛，认为组委会已经丧失了理智' },
      { label: 'D', text: '把鸡绑在背包上，让它成为你的私补+精神导师' },
    ]
  },
  {
    id: 'B14', dimension: 'B2', isSoul: false,
    text: '如果组委会允许你带一件「超能力装备」进山，你会选？',
    options: [
      { label: 'A', text: '自动导航鞋，永远不会迷路，但偶尔会带你进补给站' },
      { label: 'B', text: '隐形登山杖，只有你能看见，用来假装自己很会爬坡' },
      { label: 'C', text: '永不没电的头灯，亮度可调至「让对面山头以为天亮」' },
      { label: 'D', text: '反重力水袋，越喝越轻，喝到最后一滴时你会飘起来' },
    ]
  },
  {
    id: 'B15', dimension: 'B2', isSoul: false,
    text: '如果越野跑鞋在赛前一晚会说话，它最可能对你说什么？',
    options: [
      { label: 'A', text: '「明天的赛道我查过了，泥石流概率30%，建议请假。」' },
      { label: 'B', text: '「我想和那双HOKA换班，它的底比我厚，摔了不疼。」' },
      { label: 'C', text: '「记得给我拍一张起跑前的定妆照，我右脸比较上镜。」' },
      { label: 'D', text: '「如果明天你退赛了，请不要把责任推到我抓地力不够上。」' },
    ]
  },
  {
    id: 'B16', dimension: 'B2', isSoul: false,
    text: '你的越野背包在出发时突然裂开，只能保留一样东西，你会留？',
    options: [
      { label: 'A', text: '手机，因为要发朋友圈证明我来过' },
      { label: 'B', text: '能量胶，因为饥饿比孤独更可怕' },
      { label: 'C', text: '冲锋衣，因为我预感山神今天心情不好' },
      { label: 'D', text: '背包本身，毕竟没有背包我就没有裂开的资格' },
    ]
  },
  {
    id: 'B17', dimension: 'B2', isSoul: false,
    text: '如果你的头灯在夜跑时变成了迪斯科球，你会？',
    options: [
      { label: 'A', text: '跟着节奏摇摆跑，把夜跑变成移动夜店' },
      { label: 'B', text: '立刻关掉它，怕被野生动物当成发情信号' },
      { label: 'C', text: '利用炫目的灯光吓退前面的选手，强行开路' },
      { label: 'D', text: '拍视频发抖音，tag「全网唯一自带BGM的越野跑者」' },
    ]
  },
  {
    id: 'B18', dimension: 'B2', isSoul: false,
    text: '下雨天你的越野鞋突然长出了吸盘，像一只章鱼，你会？',
    options: [
      { label: 'A', text: '感到惊喜，认为这是生物科技与运动装备的完美结合' },
      { label: 'B', text: '有点恶心，但为了不摔死选择默默接受' },
      { label: 'C', text: '停下来拍照，发朋友圈问「有没有人遇到这种情况」' },
      { label: 'D', text: '试着用它爬树，反正赛道也没规定不能爬树抄近路' },
    ]
  },
  {
    id: 'B19', dimension: 'B2', isSoul: false,
    text: '如果你的登山杖成了精，开始指挥你跑山，它会说：',
    options: [
      { label: 'A', text: '「左！右！左！右！请你把我当拐杖而不是武器！」' },
      { label: 'B', text: '「前面那段下坡你可以飞，但摔了我可不负责。」' },
      { label: 'C', text: '「其实我是一对分手的情侣，请你不要同时握住我们俩。」' },
      { label: 'D', text: '「你挥杖的样子像在指挥交通，很帅，但没用。」' },
    ]
  },
  {
    id: 'B20', dimension: 'B2', isSoul: false,
    text: '如果你必须全程直播越野赛给你的前任看，你会怎么运营这场直播？',
    options: [
      { label: 'A', text: '专门在风景最美的CP点停下来讲解：「看，没有你我也能来这」' },
      { label: 'B', text: '一摔倒就切镜头对准天空，假装信号不好' },
      { label: 'C', text: '请志愿者帮忙举自拍杆，自己专心跑，这叫专业外包' },
      { label: 'D', text: '全程不说话，只用喘息声证明自己的努力和恨意' },
    ]
  },
  {
    id: 'B21', dimension: 'B2', isSoul: false,
    text: '如果你的跑步眼镜自带美颜滤镜，你看到的赛道会是什么样？',
    options: [
      { label: 'A', text: '所有志愿者都变成了明星脸，补给站像粉丝见面会' },
      { label: 'B', text: '爬升数据被柔焦虚化，看起来像是平坦的公园步道' },
      { label: 'C', text: '自己的倒影永远处于最佳状态，每跑一步都在放电' },
      { label: 'D', text: '终点线被P上了彩虹和独角兽，像童话世界入口' },
    ]
  },
  {
    id: 'B22', dimension: 'B2', isSoul: false,
    text: '如果你的袜子在鞋子里编出了中国结，这说明？',
    options: [
      { label: 'A', text: '你的脚趾具有极高的艺术天赋，应该送去工艺美术学院' },
      { label: 'B', text: '这双袜子的包裹性太强了，强到可以考编了' },
      { label: 'C', text: '你需要停下来把它解开，否则下山时它会变成捕兽夹' },
      { label: 'D', text: '这是山神给你的暗示：「你已经跑太远了，该回头了。」' },
    ]
  },
  {
    id: 'B23', dimension: 'B2', isSoul: false,
    text: '如果组委会宣布今年的强装检查由AI无人机执行，你会？',
    options: [
      { label: 'A', text: '穿上最闪的装备，试图用反光条干扰无人机的视觉识别' },
      { label: 'B', text: '友好地对无人机挥手，希望它给你拍一张帅气的航拍' },
      { label: 'C', text: '藏在树后面，像玩吃鸡一样躲避扫描' },
      { label: 'D', text: '贿赂无人机操作员，请他给所有选手都打勾' },
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
    text: '如果你发现赛道图上的爬升数据是组委会用PS改的，实际要多1000米，你会？',
    options: [
      { label: 'A', text: '愤怒但接受，毕竟来都来了，骂骂咧咧地爬' },
      { label: 'B', text: '立刻在选手群里曝光，发起集体诉讼（群接龙）' },
      { label: 'C', text: '把赛道图截图发朋友圈，配文「人生 first blood」' },
      { label: 'D', text: '无所谓，反正我爬坡也是走，多走一会儿的事' },
    ]
  },
  {
    id: 'B26', dimension: 'B3', isSoul: false,
    text: '爬坡时你遇到一只山羊对你竖中指（用蹄子），你会？',
    options: [
      { label: 'A', text: '不服输地加速追上它，和它进行一场尊严之战' },
      { label: 'B', text: '停下来给它拍照，配文「山里的原住民不太友好」' },
      { label: 'C', text: '跟它商量：「你驮我上去，我分你一半能量胶。」' },
      { label: 'D', text: '默默低下头，承认在这个海拔，它确实比我强' },
    ]
  },
  {
    id: 'B27', dimension: 'B3', isSoul: false,
    text: '下坡时你的膝盖开始用微信语音60秒方阵轰炸你，内容最可能是？',
    options: [
      { label: 'A', text: '「前面那段你慢点！我不是钛合金的！重复三遍！」' },
      { label: 'B', text: '「我知道你着急完赛，但请你尊重一下我的半月板。」' },
      { label: 'C', text: '「如果今天你敢PB，明天我就敢让你在马桶上起不来。」' },
      { label: 'D', text: '「其实我不疼，我只是想引起你的注意，毕竟你眼里只有配速。」' },
    ]
  },
  {
    id: 'B28', dimension: 'B3', isSoul: true,
    text: '你怎么看待「跑山」这个说法？',
    options: [
      { label: 'A', text: '跑山是精髓，下山跑起来才是爽' },
      { label: 'B', text: '上山跑不了，下山还跑不了，那叫爬山' },
      { label: 'C', text: '我更喜欢「走山」，走比跑更可持续' },
      { label: 'D', text: '跑到最后才发现，其实是在赶路' },
    ]
  },
  {
    id: 'B29', dimension: 'B3', isSoul: false,
    text: '如果你的肺在这个海拔开通了微博账号，它正在发的小作文是：',
    options: [
      { label: 'A', text: '「谢邀，人在山顶，刚下氧气瓶，感觉人生到达了巅峰。」' },
      { label: 'B', text: '「主人又在作死了，我已经报警了，但110说不归他们管。」' },
      { label: 'C', text: '「如果我有罪，请让法律制裁我，而不是让我在这里做高反训练。」' },
      { label: 'D', text: '「其实还好，主要是主人的心理素质不行，呼吸声太大了。」' },
    ]
  },
  {
    id: 'B30', dimension: 'B3', isSoul: false,
    text: '如果爬升数据突然变成了你前任的名字，每爬升100米就出现一次，你会？',
    options: [
      { label: 'A', text: '咬牙切齿地爬得更快，用汗水冲刷心理阴影' },
      { label: 'B', text: '每看到一次就停下来发朋友圈，让赛道变成情感电台' },
      { label: 'C', text: '当场退赛，认为这是组委会和前任联手设计的陷阱' },
      { label: 'D', text: '心平气和，毕竟前任已经是过去式，就像身后的下坡' },
    ]
  },
  {
    id: 'B31', dimension: 'B3', isSoul: false,
    text: '你发现技术路段其实是赛道导演组布设的综艺关卡，主持人拿着喇叭喊「请选择你的命运」，你会？',
    options: [
      { label: 'A', text: '选择「勇士通道」——一段布满泥浆和假蜘蛛的速降路线' },
      { label: 'B', text: '选择「智者通道」——解一道数学题才能通过，但答案是退赛' },
      { label: 'C', text: '选择「社交通道」——必须和陌生选手牵手跑完500米' },
      { label: 'D', text: '质问导演组：「有没有VIP通道？我加钱。」' },
    ]
  },
  {
    id: 'B32', dimension: 'B3', isSoul: false,
    text: '如果你抄近路会进入一个时间流速不同的异次元，跑1分钟等于外面1小时，你会？',
    options: [
      { label: 'A', text: '毫不犹豫地冲进去，这样可以在关门时间前美美睡一觉' },
      { label: 'B', text: '害怕出来以后手机没电错过朋友圈最佳发布时间' },
      { label: 'C', text: '拉上旁边的人一起进去，说好进去后组成生存小队' },
      { label: 'D', text: '算了，老老实实爬升，毕竟异次元可能没有补给站' },
    ]
  },
  {
    id: 'B33', dimension: 'B3', isSoul: false,
    text: '如果组委会承认「爬山虎」（爬山很快的人）其实是雇佣的托儿，你的反应是？',
    options: [
      { label: 'A', text: '恍然大悟，原来不是我弱，是对方演技太好' },
      { label: 'B', text: '愤怒，感觉自己的自卑感被商业化了' },
      { label: 'C', text: '想应聘这个岗位，毕竟我走路也很像有剧本的' },
      { label: 'D', text: '无所谓，反正我也追不上，托儿不托儿跟我没关系' },
    ]
  },
  {
    id: 'B34', dimension: 'B3', isSoul: false,
    text: '你发现自己日常最多的爬升训练其实是「在公司楼梯间躲避老板」，这说明了什么？',
    options: [
      { label: 'A', text: '说明我的越野能力已经在职场求生中得到了充分磨练' },
      { label: 'B', text: '说明我的训练计划非常贴合实际生活场景，极具功能性' },
      { label: 'C', text: '说明我需要换一份工作，或者换一个更慈悲的老板' },
      { label: 'D', text: '说明我应该把这段经历写进参赛简历，组委会可能会同情我' },
    ]
  },
  {
    id: 'B35', dimension: 'B3', isSoul: false,
    text: '如果上坡时重力突然反转了10秒钟，你会做什么？',
    options: [
      { label: 'A', text: '利用这10秒钟做倒立爬坡，拍一段全网唯一的越野视频' },
      { label: 'B', text: '惊恐地抱住旁边的大树，等待物理法则恢复正常' },
      { label: 'C', text: '往天上吐一口水，看它是不是会落到自己脸上' },
      { label: 'D', text: '趁机超越前面的人，反正牛顿暂时管不了这片区域' },
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
    text: '如果你拍到的绝美风景照片里，有一只野生大熊猫正在对你竖中指，你会？',
    options: [
      { label: 'A', text: '立刻把照片发给组委会，要求加分或颁发「最受欢迎选手奖」' },
      { label: 'B', text: '觉得这是山神显灵，证明你今天运势爆表（虽然手势不太礼貌）' },
      { label: 'C', text: 'P掉它的手指，换成点赞，然后发朋友圈 claiming 它很友善' },
      { label: 'D', text: '不敢打扰它，默默删掉照片，假装什么都没看见' },
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
    text: '如果赛道上的绝美风景其实是VR投影，你其实是戴着眼镜在跑跑步机，你会？',
    options: [
      { label: 'A', text: '摘下眼镜愤怒抗议，要求退还报名费和「精神损失费」' },
      { label: 'B', text: '觉得没关系，反正朋友圈发的是照片，照片好看就行' },
      { label: 'C', text: '偷偷把眼镜带走，以后在家跑步也能「环游世界」' },
      { label: 'D', text: '长舒一口气，难怪今天没有风，难怪补给站不会出现' },
    ]
  },
  {
    id: 'B41', dimension: 'B4', isSoul: false,
    text: '如果赛道摄影师全都是你的前任安排的，你会怎么摆pose？',
    options: [
      { label: 'A', text: '故意露出最痛苦的表情，让ta知道没有ta我过得非常惨（ physically ）' },
      { label: 'B', text: '笑得阳光灿烂，竖起大拇指，传达「离开你老子活得更好」' },
      { label: 'C', text: '背对镜头，摆出深沉的侧影，营造「孤独跑者」的艺术感' },
      { label: 'D', text: '冲过去抢相机，确保这些照片不会被公开处刑' },
    ]
  },
  {
    id: 'B42', dimension: 'B4', isSoul: false,
    text: '如果你停下来拍照时被无人机抓去做了赛事直播封面，你会？',
    options: [
      { label: 'A', text: '立刻整理头发和号码布，假装自己本来就在摆拍' },
      { label: 'B', text: '对着无人机比心，试图用颜值换取更多镜头时间' },
      { label: 'C', text: '担心自己的关门时间，对着无人机大喊「别拍了让我走！」' },
      { label: 'D', text: '趁机掏出赞助商的产品（如果有的话），假装这是一段广告植入' },
    ]
  },
  {
    id: 'B43', dimension: 'B4', isSoul: false,
    text: '如果你的手机在山上自动下载了《盗墓笔记》，你会怎么解读这个征兆？',
    options: [
      { label: 'A', text: '认为这座山可能真的藏着古墓，跑步变成了考古探险' },
      { label: 'B', text: '害怕地加快脚步，生怕天黑后遇到粽子（僵尸）' },
      { label: 'C', text: '给手机充电，让它继续下载第二部，反正下山还有很久' },
      { label: 'D', text: '觉得手机比自己还无聊，连它都在找东西打发时间' },
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
    text: '如果摄影师要求你摆出一个瑜伽动作才能拍照，你会选择？',
    options: [
      { label: 'A', text: '下犬式，既展示了柔韧性，又显得我很累很虔诚' },
      { label: 'B', text: '树式单脚站立，在山崖边展示「人与自然合一」的平衡感' },
      { label: 'C', text: '拒绝配合，告诉他「我花钱是来跑步的不是来练普拉提的」' },
      { label: 'D', text: '躺尸式，直接躺在地上，说这是「赛后恢复的真实状态」' },
    ]
  },
  {
    id: 'B46', dimension: 'B4', isSoul: false,
    text: '如果你的运动相机一整场比赛只拍到了你的鼻孔，你会怎么处理这段素材？',
    options: [
      { label: 'A', text: '配上悬疑BGM发抖音，标题「山中有巨兽，疑似鼻孔成精」' },
      { label: 'B', text: '发给朋友，让他们猜这是谁的鼻孔，猜对有奖' },
      { label: 'C', text: '认真剪辑，做成一个鼻孔特写的Vlog，走抽象艺术路线' },
      { label: 'D', text: '默默删除，并永远不再把相机挂在胸前的位置' },
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
  // ============ 新增抽象搞怪题 ============
  {
    id: 'B51', dimension: 'B1', isSoul: false,
    text: '当你在第5个CP点看到西瓜、可乐、泡面三件套时，你会：',
    options: [
      { label: 'A', text: '坐下吃满15分钟，关门兔来了我也得加完这碗卤蛋' },
      { label: 'B', text: '各尝一口，拍照发群，然后恋恋不舍地离开' },
      { label: 'C', text: '只喝水，这种补给只会腐蚀我钢铁般的意志' },
      { label: 'D', text: '把可乐倒进水袋带走，这就是战略储备' },
    ]
  },
  {
    id: 'B52', dimension: 'B1', isSoul: false,
    text: '比赛当天突降暴雨，赛道变成泥浆蹦迪现场，你的第一反应是：',
    options: [
      { label: 'A', text: '肾上腺素狂飙，这种野的路才配得上我的HOKA' },
      { label: 'B', text: '脑子里只有一个念头：能量胶会不会被泡烂' },
      { label: 'C', text: '原地打开手表看实时海拔，计算DNF路线距离' },
      { label: 'D', text: '一边骂主办方一边冲，骂得越狠跑得越快' },
    ]
  },
  {
    id: 'B53', dimension: 'B1', isSoul: false,
    text: '夜跑到荒山野岭，水袋空了、能量胶没了、前不着村后不着店，你会：',
    options: [
      { label: 'A', text: '开始冥想，进入低功耗生存模式，靠意志力巡航' },
      { label: 'B', text: '打开高德地图找最近便利店，越野跑的尽头是外卖' },
      { label: 'C', text: '蹲在路边扒野果，生死有命，甜不甜看天意' },
      { label: 'D', text: '翻出备份胶——真正的老炮永远有Plan C' },
    ]
  },
  {
    id: 'B54', dimension: 'B2', isSoul: false,
    text: '关于强制装备，你的真实态度是：',
    options: [
      { label: 'A', text: '每一件都称重，超50克都是对我PB的犯罪' },
      { label: 'B', text: '基础款摆拍，真出事了靠Salomon保命' },
      { label: 'C', text: '不仅带齐，还带了保温毯×3，怕死第一名' },
      { label: 'D', text: '强装检查员看我背包鼓成仓鼠，直接放行' },
    ]
  },
  {
    id: 'B55', dimension: 'B2', isSoul: false,
    text: '你的越野鞋收藏现状是：',
    options: [
      { label: 'A', text: 'HOKA/Salomon/Altra各一双，按赛道硬度轮班' },
      { label: 'B', text: '一双战靴穿了3000公里，底磨平了感情更深了' },
      { label: 'C', text: '不懂鞋，盲搜「UTMB冠军同款」直接下单' },
      { label: 'D', text: '鞋柜爆炸，但每场比赛还是穿那双最旧的' },
    ]
  },
  {
    id: 'B56', dimension: 'B2', isSoul: false,
    text: '赛前团购买的头灯到了，打开发现亮度还不如手机手电筒，你会：',
    options: [
      { label: 'A', text: '连夜下单Fenix，头灯是夜跑者的第二个心脏' },
      { label: 'B', text: '将就用，反正我夜路跑得少， mostly daytime' },
      { label: 'C', text: '退货+写800字差评，让后来者少走弯路' },
      { label: 'D', text: '直接挂两个，亮度不够数量来凑' },
    ]
  },
  {
    id: 'B57', dimension: 'B3', isSoul: false,
    text: '面对一段70度绝望坡，你的内心OS是：',
    options: [
      { label: 'A', text: '手脚并用才是进化论的终极答案' },
      { label: 'B', text: '打开两步路确认这不是导航抽风' },
      { label: 'C', text: '数呼吸，数步数，数到山顶就冥想超度自己' },
      { label: 'D', text: '掏出登山杖，开始表演《老人与山》' },
    ]
  },
  {
    id: 'B58', dimension: 'B3', isSoul: false,
    text: '下坡时遇到乱石+落叶+疑似野猪道的技术路段，你会：',
    options: [
      { label: 'A', text: '重心压低，大开大合，相信自己膝盖的野性' },
      { label: 'B', text: '减速到徒步配速，安全回家才是终点' },
      { label: 'C', text: '边跑边骂赛道设计师，用愤怒换平衡' },
      { label: 'D', text: '手机拍一段POV，摔了也算有素材' },
    ]
  },
  {
    id: 'B59', dimension: 'B3', isSoul: false,
    text: '为了备战百公里，你的爬升训练日常是：',
    options: [
      { label: 'A', text: '每周刷两次楼梯，从1楼爬到30楼再爬下来' },
      { label: 'B', text: '周末进山拉练，爬升2000米只是开胃菜' },
      { label: 'C', text: '跑步机坡度15%走45分钟，假装自己在 Alps' },
      { label: 'D', text: '不练，比赛当天靠肾上腺素和报应硬扛' },
    ]
  },
  {
    id: 'B60', dimension: 'B4', isSoul: false,
    text: '冲线后摄影师拍下了你的完赛照，照片里的你：',
    options: [
      { label: 'A', text: '面带微笑竖起大拇指，像刚遛完公园' },
      { label: 'B', text: '面目狰狞、四肢扭曲、号码布已飞到腰上' },
      { label: 'C', text: '忙着发朋友圈，根本没看镜头' },
      { label: 'D', text: '躺在终点线后面三米处，照片是志愿者俯拍的' },
    ]
  },
  {
    id: 'B61', dimension: 'B4', isSoul: false,
    text: '赛后三天，你的社交动态状态是：',
    options: [
      { label: 'A', text: '九宫格风景+路线+奖牌，文案引用《瓦尔登湖》' },
      { label: 'B', text: '只发一张膝盖淤青特写，配文「还活着」' },
      { label: 'C', text: '连发7条短视频，BGM是《平凡之路》加速版' },
      { label: 'D', text: '一条都没发，默默在跑群回复「下次不报了」' },
    ]
  },
  {
    id: 'B62', dimension: 'B4', isSoul: false,
    text: '家人问你「跑这么久到底图什么」，你标准答案是：',
    options: [
      { label: 'A', text: '山里的风是免费的，我的快乐也是' },
      { label: 'B', text: '为了朋友圈那几个赞，我付出了太多' },
      { label: 'C', text: '图那一块完赛牌，可以当刮痧板用三年' },
      { label: 'D', text: '沉默三秒，说「你不懂」，然后转身涂扶他林' },
    ]
  },
]
