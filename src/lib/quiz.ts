import { Question, Answer, TagResult, MacroScore } from './types'

// 24种跑步人格（戏谑冒犯版）
const RUNNER_TYPES = [
  '移动隔离舱驾驶员', '仪式感套利者', '运动痕迹管理大师', '意志力通货膨胀者',
  '报名决策狂热者', '赛道美食评论家', '可穿戴设备依赖症患者', '沙发马拉松',
  '约跑贩子', '气象局编外', '赤脚大仙', '购物车跑者',
  '跑圈NPC', 'Strava装逼犯', '躺完选手', '当年勇选手',
  '爬坡废物', '补给守财奴', '赛道遛弯大爷', '退赛钉子户',
  '5点变态', '火锅赎罪券', '自律表演艺术家', '数据型焦虑症晚期',
]

// 类型元数据
const TYPE_META: Record<string, { keywords: string[]; en: string; img: string; tagline: string; cpTypes: string[]; worstTypes: string[]; roast: string; hype: string; action: string; profile: string; emoji: string }> = {
  '移动隔离舱驾驶员': {
    keywords: ['一个人跑', '自由', '晨跑'],
    en: 'Introvert Runner', img: 'lone_wolf',
    tagline: '耳机一戴，全世界都欠我五公里',
    cpTypes: ['赤脚大仙', '跑圈NPC'],
    worstTypes: ['约跑贩子', '赛道美食评论家'],
    roast: '你跑步是为了远离人群，跑完还发朋友圈，但你设置了仅自己可见。你的佳明数据比你的微信好友多。',
    hype: '下次试试跟一个陌生人跑，可能会发现社交也没那么可怕——也可能更可怕。',
    action: '这周试试跑团活动，不说话也行',
    profile: '你享受一个人跑步的自由，耳机一戴，世界与你无关。你不理解为什么有人喜欢一边跑步一边聊天——那不叫跑步，那叫移动会议。你的跑步时间是私人领地，最好的约跑是各自出发、各自回家、全程不碰面。',
    emoji: '🐺'
  },
  '仪式感套利者': {
    keywords: ['完赛', '奖牌', '报名费'], en: 'Medal Simp', img: 'medal_freak',
    tagline: '完赛不是为了跑，是为了拥有一个「完成」的符号',
    cpTypes: ['自律表演艺术家', '运动痕迹管理大师'],
    worstTypes: ['躺完选手', '赛道遛弯大爷'],
    roast: '你跑步的动力80%来自完赛奖牌，20%来自朋友圈。成绩？那是什么。你的抽屉里奖牌比里程数还多，但每块都擦得锃亮。',
    hype: '下次试着用成绩拿奖牌，而不是用报名费。',
    action: '把抽屉里的奖牌数一遍，够不够你的虚荣心',
    profile: '你对报名的兴奋远大于对跑步的兴奋，每次赛前夜晚翻来覆去睡不着，脑子里全是完赛后的朋友圈文案。抽屉里的奖牌按时间排列，每块都擦得锃亮。你不在乎PB，不在乎配速，你在乎的是完赛证书上有没有你的名字。',
    emoji: '🏅'
  },
  '运动痕迹管理大师': {
    keywords: ['构图', '朋友圈', '颜值'], en: 'Moments Runner', img: 'shot_hunter',
    tagline: '没拍等于没跑，修图等于训练',
    cpTypes: ['仪式感套利者', '约跑贩子'],
    worstTypes: ['数据型焦虑症晚期', '移动隔离舱驾驶员'],
    roast: '你的Strava记录里，配速最慢的都是构图最好的。跑5公里花2公里拍照，剩下3公里在修图。',
    hype: '下次跑完发一张纯成绩截图，不带滤镜，看看还有没有人点赞。',
    action: '跑完忍住30分钟不掏手机',
    profile: '你的跑步轨迹本身就是一条精心设计的摄影路线。5公里里能找到8个构图绝佳的拍摄点，配速最慢的那一公里一定是风景最好的那一公里。你的跑步装备里最重要的是手机支架和充电宝，你的佳明数据里一半是跑步记录一半是拍照停留。',
    emoji: '📸'
  },
  '意志力通货膨胀者': {
    keywords: ['撞墙', '步行', '咬牙'], en: '30km Trash', img: 'wall_hugger',
    tagline: '你每次都以为意志力够用，它每次都让你失望',
    cpTypes: ['补给守财奴', '退赛钉子户'],
    worstTypes: ['数据型焦虑症晚期', 'Strava装逼犯'],
    roast: '你每次都信誓旦旦这次绝不走路，然后30公里准时变步行。你的能量胶在30km后比你还先放弃。',
    hype: '你的身体能在30公里后继续，只是你的脑子不同意。',
    action: '下次到30km时别减速，骗自己还有5公里',
    profile: '每次比赛你都有3个plan：A计划全程跑完，B计划30公里后允许走路，C计划叫车回家。你每次都用B计划，偶尔用C。你的能量胶储备足够跑3个马拉松，但35公里的时候你都会怀疑人生的意义。',
    emoji: '🧱'
  },
  '报名决策狂热者': {
    keywords: ['押金', 'DNS', '抽屉奖牌'], en: 'Serial Flaker', img: 'bib_hoarder',
    tagline: '押金的沉没速度，快过我的有氧基础',
    cpTypes: ['仪式感套利者', '约跑贩子'],
    worstTypes: ['退赛钉子户', '数据型焦虑症晚期'],
    roast: '你报名的速度比你跑步的速度快了3倍。抽屉里号码布比跑步里程还长。今年已报名8场，完赛0场。',
    hype: '报名费是你对跑步最大的贡献。',
    action: '翻翻抽屉，找块号码布去把它跑了',
    profile: '你报名的速度是配速的3倍，每次比赛开放报名你第一时间冲进去，然后在赛前一周"膝盖不适"。抽屉里有12块号码布，每一块都代表一次"下次一定"。你对跑步最大的贡献是报名费，赛事组委会最爱的选手。',
    emoji: '🕊️'
  },
  '赛道美食评论家': {
    keywords: ['吃的', '补给站', '研究'], en: 'Aid Station Bandit', img: 'snack_nomad',
    tagline: '来都来了，不吃够本对不起报名费',
    cpTypes: ['意志力通货膨胀者', '赛道遛弯大爷'],
    worstTypes: ['移动隔离舱驾驶员', '赤脚大仙'],
    roast: '你进补给站的速度比你跑步配速还快，每次都是最后离开的那个人。补给站志愿者都认识你了，叫你"又来了"。',
    hype: '你是来跑步的还是来吃自助餐的？下次能不能先跑3公里再吃。',
    action: '进补给站前先跑够10分钟',
    profile: '你研究每场比赛的补给清单比研究赛道爬升还认真，你知道哪个马拉松的香蕉最甜、哪个越野赛的泡面最入味。对你来说补给站不是途经点，是目的地。你的比赛策略是跑到补给站、吃到关门、跑向下一个补给站。',
    emoji: '🍜'
  },
  '可穿戴设备依赖症患者': {
    keywords: ['手表', '数据', 'VO2max'], en: 'Data Slave', img: 'data_cultist',
    tagline: '没有数据，你就不确定自己存在过',
    cpTypes: ['Strava装逼犯', '数据型焦虑症晚期'],
    worstTypes: ['自律表演艺术家', '赛道遛弯大爷'],
    roast: '你的佳明比你妈还了解你。心率没到就焦虑，VO2max降了比失恋还难受。你的TrainingPeaks训练计划精确到每秒。',
    hype: '有一天你忘戴手表跑了10公里，会发现跑步原来可以这么自由。',
    action: '今天跑步不带手表，试试用身体感受配速',
    profile: '你的佳明手表数据比你妈还了解你的身体，每天的Training Status、VO2max、恢复时间都烂熟于心。如果有一天手表说你不适合跑步，你真的会停下来。你的跑步记录里没有一次"轻松跑"，因为手表不认可"轻松"这个概念。',
    emoji: '⌚'
  },
  '沙发马拉松': {
    keywords: ['跟练', '室内', '云跑步'], en: 'Couch Marathoner', img: 'couch_runner',
    tagline: 'Keep就是我的赛道',
    cpTypes: ['自律表演艺术家', '躺完选手'],
    worstTypes: ['数据型焦虑症晚期', '5点变态'],
    roast: '你的跑步生涯都在Keep里，奖牌是虚拟的，汗水是意念的。月跑量120km，其中100km是跟练算的。',
    hype: '外面有一条真实的赛道在等你，不用充电的那种。',
    action: '今天出门跑1公里，就1公里',
    profile: '你的跑步生涯全部发生在手机屏幕里，Keep的虚拟奖牌比真人的还多，但你从没感受过风打在脸上的感觉。你说等天气好就出去跑，但你的"好天气"标准是20°C、微风、阴天、湿度50%、PM2.5低于30——这种天气一年也就两天。',
    emoji: '🛋️'
  },
  '约跑贩子': {
    keywords: ['组织', '约跑', '操心'], en: 'Run Dealer', img: 'pack_leader',
    tagline: '不约人跑步我会死',
    cpTypes: ['运动痕迹管理大师', '赛道美食评论家'],
    worstTypes: ['移动隔离舱驾驶员', '赤脚大仙'],
    roast: '你组织的约跑比你实际参加的还多。每次都在群里喊人，自己反而跑不动。你的微信群比你的跑量还活跃。',
    hype: '你领导了一群人跑步，但这群人也在消耗你的训练时间。',
    action: '这周约跑设定配速目标，不能光顾着聊天',
    profile: '你组织的约跑比你参加的还多，你享受当"团长"的感觉，群里喊一句"明早6点集合"比你自己跑完全马还有成就感。你的配速从来不重要，重要的是有没有人响应你的号召。你不是在约跑，你是在经营社交帝国。',
    emoji: '📢'
  },
  '气象局编外': {
    keywords: ['预报', '焦虑', '装备'], en: 'Weather Nerd', img: 'weather_nerd',
    tagline: '看三天预报再决定出门',
    cpTypes: ['赤脚大仙', '爬坡废物'],
    worstTypes: ['移动隔离舱驾驶员', '自律表演艺术家'],
    roast: '你每天看墨迹天气的次数比跑步的次数还多，最终还是在看天气和看心情之间选了后者。你的手机天气App常年排在首页。',
    hype: '下雨你不去，太热你不去，太冷你不去——你到底是跑者还是天气预报审核员？',
    action: '不管天气如何，穿好装备出门',
    profile: '你手机里天气App常年占据首页，跑步前要看3天天气预报：温度、湿度、风力、降水概率、紫外线指数。任何一个指标不在舒适区间你就"今天不跑了"。你对天气的了解已经超过了大部分气象专业的学生。',
    emoji: '🌧️'
  },
  '赤脚大仙': {
    keywords: ['轻量化', '能不带', '精简'], en: 'Barefoot Monk', img: 'gear_monk',
    tagline: '能不带的坚决不带',
    cpTypes: ['补给守财奴', '移动隔离舱驾驶员'],
    worstTypes: ['购物车跑者', '气象局编外'],
    roast: '你的越野包里只有水袋，连防晒都不带。然后你晒伤了，说这是勋章。你的装备总重不到2公斤，钱包表示欣慰。',
    hype: '极简是能力，不是抠门。下次带上防晒和头灯再吹。',
    action: '下次比赛前，看看强制装备清单',
    profile: '你的越野包里只有水袋，连手机都不带。你觉得装备多是一种负担，防晒霜是化学武器，登山杖是拐杖。你跑完越野赛晒得像换了个人种，但你说这是"太阳的奖牌"。你的极简不是信仰，是懒得收拾背包。',
    emoji: '🧘'
  },
  '购物车跑者': {
    keywords: ['换装', '买鞋', '背包'], en: 'Shopping Cart Runner', img: 'gear_panic',
    tagline: '装备买齐了，人还没齐',
    cpTypes: ['可穿戴设备依赖症患者', 'Strava装逼犯'],
    worstTypes: ['赤脚大仙', '自律表演艺术家'],
    roast: '你赛前换三双鞋、两次衣服、重新打包四次。发令枪响了你还在调背包。你的装备总价值超过你今年的比赛报名费。',
    hype: '你花在装备上的时间比训练时间还长，但成绩还是那样。',
    action: '这次比赛就用现有装备，不许买新的',
    profile: '你赛前焦虑的解决方案是买新装备，跑鞋比跑量还多，越野包有三个但每次比赛前都会重新买一个。你发令枪响前的最后准备不是热身，是纠结穿哪双袜子。你花在挑选装备上的时间比训练时间还长，但成绩还是那样。',
    emoji: '🛒'
  },
  '跑圈NPC': {
    keywords: ['无故事', '跑量', '沉淀'], en: 'Running NPC', img: 'ghost_runner',
    tagline: '跑了五年，没人知道',
    cpTypes: ['当年勇选手', '自律表演艺术家'],
    worstTypes: ['运动痕迹管理大师', 'Strava装逼犯'],
    roast: '你跑了5年，从不发朋友圈，不参加比赛，不加入跑团。你是不是不存在？你的佳明记录里只有里程，没有社交。',
    hype: '你的坚持比任何人的show-off都强，但这个世界需要知道你的存在。',
    action: '报一场比赛，让计时毯证明你来过',
    profile: '你跑了5年没有人知道你存在，不发朋友圈不加跑团不参加比赛。你的跑鞋换了4双，但你的微信运动从来没有出现在任何人的点赞列表里。你是跑圈最忠实的隐形人，也是最容易流失的那个人。',
    emoji: '👤'
  },
  'Strava装逼犯': {
    keywords: ['数据', '分析', '排名'], en: 'Strava Poser', img: 'cyber_runner',
    tagline: '先发Strava再喝水',
    cpTypes: ['可穿戴设备依赖症患者', '数据型焦虑症晚期'],
    worstTypes: ['自律表演艺术家', '跑圈NPC'],
    roast: 'VO2max涨了2点，你兴奋到发三条动态。跑步的意义？看有没有人给你kudos。你的Segment排名比你的工资涨幅还让你激动。',
    hype: '数据是数字，不是你。你比你手表里的数字有趣多了。',
    action: '跑完不发Strava，忍一天',
    profile: '你跑完第一件事不是拉伸是发Strava，Segment排名比工资排名还让你上心。你给每一个kudos都精打细算——只给那些可能回赞的人。你的跑步数据是你的第二份简历，你的VO2max是你的社交名片。',
    emoji: '📱'
  },
  '躺完选手': {
    keywords: ['精神', '躺平', '云跑'], en: 'Couch Finisher', img: 'soul_finisher',
    tagline: '躺完也是完赛',
    cpTypes: ['沙发马拉松', '自律表演艺术家'],
    worstTypes: ['数据型焦虑症晚期', '5点变态'],
    roast: '你躺在床上看比赛直播，紧张到出汗，感觉自己也在赛道上。辛苦了。你的跑步记录app已经卸载三个月了。',
    hype: '虚拟完赛证书打印出来贴墙上，和真的一样——骗鬼呢。',
    action: '今天不躺着，出去走一圈也算',
    profile: '你躺在床上看比赛直播的参与感比实际参赛还强，心率在观看别人冲刺时比你自己跑步时还高。你说"明年我一定报名"，但你知道明年你还会躺在同样位置说同样的话。你的完赛体验全凭想象力。',
    emoji: '🛏️'
  },
  '当年勇选手': {
    keywords: ['当年', '初心', '新人'], en: 'Glory Days', img: 'day_one',
    tagline: '想当年我首马3xx',
    cpTypes: ['跑圈NPC', '意志力通货膨胀者'],
    worstTypes: ['Strava装逼犯', '数据型焦虑症晚期'],
    roast: '你嘴里永远是"当年"，但当年的配速已经不好意思再提了。现在你只是越来越挑剔的老炮。你的PB停留在2019，但你每次聊起来像昨天。',
    hype: '别总说现在比赛没意思，是你自己没意思了。',
    action: '约一个新手一起跑，你会想起当年的自己',
    profile: '你的口头禅是"想当年"，2019年的首马成绩是最后的辉煌，之后每一年都在下滑。你对新人的建议比你的实际训练量还多，你嘴里永远是当年但当年的配速已经不好意思再提了。你是跑圈的活化石，也是年轻人最怕遇到的搭子。',
    emoji: '👴'
  },
  '爬坡废物': {
    keywords: ['坡', '下山', '崩溃'], en: 'Hill Quitter', img: 'hill_victim',
    tagline: '上坡怀疑人生，下坡感谢活着',
    cpTypes: ['赛道遛弯大爷', '赛道美食评论家'],
    worstTypes: ['补给守财奴', '数据型焦虑症晚期'],
    roast: '你看到坡就开始降速，看到大坡就想退赛。越野跑在你这里变成越野走。你的垂直爬升数据永远是个位数。',
    hype: '爬坡是越野跑的必修课，你不是废物，你只是还没修满学分。',
    action: '下次遇到坡别怂，小步快频冲上去',
    profile: '你看到坡就降速看到大坡就想退赛，平路上的配速和越野大神一样，但一上坡就变成徒步爱好者。你的垂直爬升数据永远是个位数，但你的下坡配速可以追上任何人。越野跑在你这里变成了越野走。',
    emoji: '⛰️'
  },
  '补给守财奴': {
    keywords: ['能量胶', '盐丸', '自给自足'], en: 'Fuel Miser', img: 'diy_fuel',
    tagline: '我的背包就是移动补给站',
    cpTypes: ['意志力通货膨胀者', '仪式感套利者'],
    worstTypes: ['赛道美食评论家', '赛道遛弯大爷'],
    roast: '你背包里永远是能量胶和盐丸，但进补给站还是忍不住拿了西瓜。嘴上说自给自足，身体很诚实。你的越野包重量比别人的多30%，全是补给。',
    hype: '你的自给自足是超能力，但偶尔享受别人的补给也是一种技能。',
    action: '下次试试当地特色补给，别光啃能量胶',
    profile: '你的越野包是移动补给站，能量胶按公里数精确分配，盐丸按出汗量计算。你进补给站只喝水，但你的眼神会在蛋糕上停留0.5秒。你的比赛预算里报名费占80%补给占20%，你是赛事主办方最不欢迎的那种选手。',
    emoji: '💊'
  },
  '赛道遛弯大爷': {
    keywords: ['健走', '休闲', '完赛'], en: 'Track Stroller', img: 'slow_mo',
    tagline: '完赛就行，配速随缘',
    cpTypes: ['意志力通货膨胀者', '赛道美食评论家'],
    worstTypes: ['数据型焦虑症晚期', '5点变态'],
    roast: '你把马拉松走完了30公里，还发朋友圈说"安全完赛"。你确实完赛了，但那不叫跑。你的关门成绩和你的配速一样稳定——永远6小时。',
    hype: '走也是一种前进，但你报名的时候说的是"跑"马拉松。',
    action: '下次30公里后试着跑起来，哪怕慢跑',
    profile: '你报名了马拉松但你心里清楚这是徒步活动，配速和快走差不多但你坚持到了终点。你在关门时间前10分钟冲过终点线表情比冠军还痛苦，发的朋友圈永远只有四个字"安全完赛"。你把马拉松走完了30公里，还觉得自己挺厉害的。',
    emoji: '🚶'
  },
  '退赛钉子户': {
    keywords: ['退赛', '战略性', '下次'], en: 'DNF Squatter', img: 'dnf_phoenix',
    tagline: '退赛不是终点，是常态',
    cpTypes: ['意志力通货膨胀者', '爬坡废物'],
    worstTypes: ['仪式感套利者', '报名决策狂热者'],
    roast: '你退赛的次数比你完赛的次数多，朋友圈从来不提退赛那几次。选择性失忆是吧？你的DNF记录比PB记录还长。',
    hype: '每一次退赛都是为下一次完赛蓄力——但你也蓄太久了。',
    action: '报名一场之前退过的比赛，这次别退',
    profile: '你的DNF次数比完赛次数多，每次退赛都有"战略性"的理由：膝盖、天气、装备、赛道不安全。你的朋友圈永远只有完赛的照片，退赛的那些都被选择性删除了。你对退赛的理由比你对训练计划的准备还充分。',
    emoji: '🚫'
  },
  '5点变态': {
    keywords: ['早起', '挤时间', '效率'], en: '5AM Psycho', img: '5am_warrior',
    tagline: '5点跑步8点打卡上班',
    cpTypes: ['数据型焦虑症晚期', 'Strava装逼犯'],
    worstTypes: ['躺完选手', '自律表演艺术家'],
    roast: '你每天5点起床跑步，8点到工位——然后9点开始打瞌睡。你这不是自律，是自虐。你的闹钟设了4个，前3个叫醒全家。',
    hype: '跑步让你有精力，但缺觉让你没有命花这个精力。',
    action: '周末多睡一小时再跑，不会变慢的',
    profile: '你的闹钟设在4:50但你4:45就醒了，跑步的时候整条路上只有你和清洁工。同事问你为什么每天精神抖擞你没好意思说你5点已经跑了10公里。你把缺觉当勋章把黑眼圈当奖牌，你的自律感动了自己但打瞌睡出卖了你。',
    emoji: '⏰'
  },
  '火锅赎罪券': {
    keywords: ['火锅', '跑完吃', '燃烧'], en: 'Hotpot Atoner', img: 'buffet_warrior',
    tagline: '跑步是为了吃得更心安理得',
    cpTypes: ['赛道美食评论家', '赛道遛弯大爷'],
    worstTypes: ['可穿戴设备依赖症患者', '补给守财奴'],
    roast: '你跑步的唯一目的是晚上那顿火锅。跑5公里消耗350大卡，吃完火锅摄入3000大卡，还觉得自己赚了。',
    hype: '跑步和美食都是生活，但别把跑步当成放纵的入场券。',
    action: '跑完等2小时再吃，让身体先缓过来',
    profile: '你跑步是为了晚上那顿火锅没有负罪感，精确计算每公里消耗的热量然后在火锅店超额补回来。你的跑步路线终点永远是餐厅，你的约跑实际上是约饭。跑5公里消耗350大卡，吃完火锅摄入3000大卡，你觉得赚了。',
    emoji: '🍲'
  },
  '自律表演艺术家': {
    keywords: ['看心情', '不卷', '享受'], en: 'Zen Slacker', img: 'zen_runner',
    tagline: '不卷，但也不允许自己真的躺平',
    cpTypes: ['移动隔离舱驾驶员', '赛道遛弯大爷'],
    worstTypes: ['数据型焦虑症晚期', '5点变态'],
    roast: '你说跑步看心情，但你的心情好像从来都不是"想跑步"。你的跑鞋积灰比跑量还多。月跑量全靠微信步数凑。',
    hype: '偶尔认真跑一次，你会发现自己原来可以——但你不会的。',
    action: '不想跑？先穿鞋出门，走也行',
    profile: '你说跑步看心情但你的心情永远是"不想跑"，跑鞋买了一年还像新的一样跑步App已经卸载了。你说你不卷其实你是卷不动，你说看天气其实你连窗帘都没拉开看。你的"佛系"是对懒惰最高级的包装。',
    emoji: '🍃'
  },
  '数据型焦虑症晚期': {
    keywords: ['配速', 'PB', '排名'], en: 'Pace Simp', img: 'pb_tyrant',
    tagline: '配速就是尊严，尊严需要截图证明',
    cpTypes: ['可穿戴设备依赖症患者', '5点变态'],
    worstTypes: ['自律表演艺术家', '躺完选手'],
    roast: '你跟配速较劲的样子，像极了跟渣男较劲的舔狗。但配速不会回头的。你的5K PB精确到0.01秒，但你的膝盖精确到每个月疼一次。',
    hype: '当你不再盯着配速，PB反而会来找你。放下执念，先学会享受跑步。',
    action: '这次跑步不看配速，结束后再看数据',
    profile: '你和配速的关系比任何人际关系都认真，每一公里都精确到秒，VO2max的波动比你的情绪波动还大。你的跑步手表是你最贵重的首饰，你的PB是你最骄傲的谈资。你对配速的执着像极了舔狗对渣男的执着——明知没有回报还要继续。',
    emoji: '🔥'
  },
}

// 获取角色元数据（英文名+图片ID+标语+emoji）
export function getTypeMeta(runnerType: string): { en: string; img: string; tagline: string; emoji: string } {
  const meta = TYPE_META[runnerType]
  return { en: meta?.en || '', img: meta?.img || '', tagline: meta?.tagline || '', emoji: meta?.emoji || '' }
}

// 维度 → 每维度抽取题数配置（总共15题）
export const DIMENSION_CONFIG: Record<string, number> = {
  A1: 2, A2: 2, A3: 2, A4: 2, A5: 2,
  B1: 1, B2: 1, B3: 2, B4: 1,
}

export const DIMENSION_LABELS: Record<string, string> = {
  A1: '动机与身份', A2: '赛道行为', A3: '装备与仪式',
  A4: '赛前与赛后', A5: '自我认知',
  B1: '吃苦与享乐', B2: '装备与强制', B3: '爬升与技术', B4: '风景与完赛',
}

// 随机打乱数组
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// 按维度分组题目（保留供外部使用）
export function groupByDimension(questions: Question[]) {
  const groups: Record<string, Question[]> = {}
  for (const q of questions) {
    if (!groups[q.dimension]) groups[q.dimension] = []
    groups[q.dimension].push(q)
  }
  return groups
}

// 核心：随机抽题算法（接受动态题目池）
export function generateQuiz(allQuestions: Question[]) {
  const byDimension: Record<string, Question[]> = {}
  for (const q of allQuestions) {
    if (!byDimension[q.dimension]) byDimension[q.dimension] = []
    byDimension[q.dimension].push(q)
  }

  const selectedQuestions: Question[] = []
  const dimensionCounts: Record<string, number> = {}

  for (const [dim, count] of Object.entries(DIMENSION_CONFIG)) {
    const pool = byDimension[dim] || []
    const shuffled = [...pool].sort(() => Math.random() - 0.5)
    const picked = shuffled.slice(0, count)
    selectedQuestions.push(...picked)
    dimensionCounts[dim] = picked.length
  }

  const finalShuffled = shuffle(selectedQuestions)

  return {
    questions: finalShuffled,
    dimensionCounts,
  }
}

// 计算维度得分（0-100）
function calcDimensionScore(answers: Answer[], dimension: string): number {
  const dimAns = answers.filter(a => a.dimension === dimension)
  if (dimAns.length === 0) return 0
  const scoreMap: Record<string, number> = { A: 4, B: 3, C: 2, D: 1 }
  const total = dimAns.reduce((sum, a) => sum + (scoreMap[a.optionLabel] || 2), 0)
  const max = dimAns.length * 4
  const base = Math.round((total / max) * 100)
  const jitter = Math.floor(Math.random() * 9) - 4
  return Math.min(100, Math.max(5, base + jitter))
}

// 4个宏观维度：从9个微观维度聚合
function calcMacroScores(dimensionScores: Record<string, number>): MacroScore {
  const get = (dim: string) => dimensionScores[dim] || 0

  const drive = (get('A1') + get('A5')) / 2
  const social = get('A2')
  const obsession = (get('A3') + get('A4')) / 2
  const wildness = (get('B1') + get('B2') + get('B3') + get('B4')) / 4

  return { drive, social, obsession, wildness }
}

// 4位二进制 → 16种基础角色
const MACRO_TYPE_TABLE: Record<number, string> = {
  15: '数据型焦虑症晚期',
  14: 'Strava装逼犯',
  13: '约跑贩子',
  12: '5点变态',
  11: '可穿戴设备依赖症患者',
  10: '仪式感套利者',
  9:  '退赛钉子户',
  8:  '意志力通货膨胀者',
  7:  '赛道美食评论家',
  6:  '报名决策狂热者',
  5:  '赛道遛弯大爷',
  4:  '运动痕迹管理大师',
  3:  '补给守财奴',
  2:  '购物车跑者',
  1:  '自律表演艺术家',
  0:  '躺完选手',
}

// 特殊覆盖规则（极端模式 → 8种特殊角色）
function checkSpecialOverrides(macro: MacroScore): string | null {
  if (macro.drive < 38 && macro.social < 38 && macro.obsession < 38 && macro.wildness < 38) {
    return '沙发马拉松'
  }
  if (macro.social < 28) {
    return '移动隔离舱驾驶员'
  }
  const vals = [macro.drive, macro.social, macro.obsession, macro.wildness]
  const spread = Math.max(...vals) - Math.min(...vals)
  if (spread < 12) {
    return '跑圈NPC'
  }
  if (macro.obsession < 32) {
    return '赤脚大仙'
  }
  if (macro.wildness >= 72 && macro.drive < 42) {
    return '爬坡废物'
  }
  if (macro.obsession >= 72 && macro.drive >= 62) {
    return '气象局编外'
  }
  if (macro.drive >= 72 && macro.obsession < 45) {
    return '当年勇选手'
  }
  if (macro.social >= 58 && macro.wildness < 38 && macro.drive < 48) {
    return '火锅赎罪券'
  }
  return null
}

// 判定角色类型
function determineRunnerType(_answers: Answer[], dimensionScores: Record<string, number>): string {
  const macro = calcMacroScores(dimensionScores)

  const jitter = () => Math.floor(Math.random() * 25) - 12
  const jittered: MacroScore = {
    drive: Math.max(0, Math.min(100, macro.drive + jitter())),
    social: Math.max(0, Math.min(100, macro.social + jitter())),
    obsession: Math.max(0, Math.min(100, macro.obsession + jitter())),
    wildness: Math.max(0, Math.min(100, macro.wildness + jitter())),
  }

  const override = checkSpecialOverrides(jittered)
  if (override) return override

  const code = (jittered.drive >= 50 ? 8 : 0)
    | (jittered.social >= 50 ? 4 : 0)
    | (jittered.obsession >= 50 ? 2 : 0)
    | (jittered.wildness >= 50 ? 1 : 0)

  return MACRO_TYPE_TABLE[code] || '自律表演艺术家'
}

// 生成判词
function generateVerdict(answers: Answer[], _runnerType: string, dimensionScores: Record<string, number>): string {
  const macro = calcMacroScores(dimensionScores)

  // 隐藏人格特判
  const dCount = answers.filter(a => a.optionLabel === 'D').length
  if (dCount >= 8) {
    return `摆烂指数爆表(${dCount}次选D)；系统已放弃分析；直接判定为隐藏人格`
  }

  // 用原始 macro score（无 jitter），保证数字稳定
  const clues: string[] = []

  if (macro.drive >= 70) clues.push(`斗志爆表(${Math.round(macro.drive)})，卷属性拉满`)
  else if (macro.drive <= 30) clues.push(`斗志垫底(${Math.round(macro.drive)})，躺平实锤`)

  if (macro.social >= 70) clues.push(`社交满分(${Math.round(macro.social)})，不约跑不舒服`)
  else if (macro.social <= 30) clues.push(`社交极低(${Math.round(macro.social)})，社恐认证`)

  if (macro.obsession >= 70) clues.push(`执念爆表(${Math.round(macro.obsession)})，装备控无疑`)
  else if (macro.obsession <= 30) clues.push(`执念极低(${Math.round(macro.obsession)})，佛系随性`)

  if (macro.wildness >= 70) clues.push(`野性十足(${Math.round(macro.wildness)})，越野是归宿`)
  else if (macro.wildness <= 30) clues.push(`野性不足(${Math.round(macro.wildness)})，路跑才是真爱`)

  const aCount = answers.filter(a => a.optionLabel === 'A').length
  if (dCount >= 6) clues.push(`${dCount}次选D，摆烂指数偏高`)
  if (aCount >= 8) clues.push(`${aCount}次选A，卷王认证`)

  if (clues.length === 0) {
    clues.push('维度分布均衡，是个谜一样的跑者')
  }

  return clues.join('；')
}

// 计算结果
export function calculateResult(answers: Answer[]): TagResult & {
  dimensionScores: Record<string, number>
  macroScores: MacroScore
  dominantDim: string
  roast: string
  hype: string
  action: string
  emoji: string
  profile: string
  cpMatch: { type: string; desc: string; score: number }
  worstCpMatch: { type: string; desc: string; score: number }
} {
  const dimensionScores: Record<string, number> = {}
  for (const dim of [...Object.keys(DIMENSION_CONFIG)]) {
    dimensionScores[dim] = calcDimensionScore(answers, dim)
  }

  const dCount = answers.filter(a => a.optionLabel === 'D').length
  const isHiddenType = dCount >= 8

  const runnerType = determineRunnerType(answers, dimensionScores)
  const meta = TYPE_META[runnerType]

  const eggSymbols: string[] = []
  if (isHiddenType) {
    eggSymbols.push('💔')
  } else {
    if (dimensionScores['B1'] >= 70) eggSymbols.push('🏔️')
    if (dimensionScores['B2'] >= 75) eggSymbols.push('☀️')
    if (dimensionScores['B3'] >= 70) eggSymbols.push('🔥')
  }

  const cpMatch = buildCpMatch(runnerType)
  const worstCpMatch = buildWorstCpMatch(runnerType)
  const macroScores = calcMacroScores(dimensionScores)

  // 找主导维度
  const dimEntries = Object.entries(macroScores) as [string, number][]
  dimEntries.sort((a, b) => b[1] - a[1])
  const dominantDim = dimEntries[0]?.[0] || 'drive'

  return {
    runnerType,
    runnerTypeEn: meta?.en || '',
    runnerImg: meta?.img || '',
    tagline: meta?.tagline || '',
    eggSymbols,
    hiddenEgg: isHiddenType ? 'cloud-runner' : null,
    isHiddenType,
    dimensionScores,
    macroScores,
    dominantDim,
    roast: meta?.roast || '跑步是你生活的一部分。',
    hype: meta?.hype || '下一场比赛，等你来战。',
    action: meta?.action || '去跑步吧。',
    emoji: meta?.emoji || '🏃',
    profile: meta?.profile || '',
    cpMatch,
    worstCpMatch,
    verdict: generateVerdict(answers, runnerType, dimensionScores),
  }
}

// 最佳CP匹配描述
const bestCpDescs: Record<string, string> = {
    '移动隔离舱驾驶员': '你们之间不需要对话。一个发路线截图，另一个回OK，全程不说话，跑完各自回家。完美的社交距离，完美的配速默契。唯一的问题是——你们谁都不会先开口约下一次。',
    '仪式感套利者': '你们赛前都睡不着但原因不同——你是因为紧张他是因为兴奋。你们在终点线会师互相举着手机拍照，友谊建立在完赛证书之上。你们约跑的动力不是训练是收集下一块奖牌。',
    '运动痕迹管理大师': '你们跑步的节奏完美同步——你停下来喝水他停下来拍照，你加速他在找下一个构图点。你们都不在乎配速，在乎的是这条路线好不好看。你们的合照永远是赛道上最好看的。',
    '意志力通货膨胀者': '你们30公里后的配速完全一致——都是走路。但走得很默契，互相递能量胶互相说"加油就快了"。你们的完赛时间可能比跑完的还快乐，因为后半程你们一直在聊天。',
    '报名决策狂热者': '你们互相理解"报名就是参与"的哲学。你说"下次一定"他说"我也一定"，然后你们一起鸽了那场比赛。你们的友谊不需要赛道证明，报名截图就够了。',
    '赛道美食评论家': '你们的比赛节奏是跑到补给站、吃到关门、跑向下一个补给站。你知道哪个站有西瓜他知道哪个站有可乐。你们是赛道上的美食搭档，配速不重要，补给的性价比才重要。',
    '可穿戴设备依赖症患者': '你们交换手表数据的热情比跑步本身还高，跑完第一件事不是喝水是看VO2max。你们能就"今天的训练效果是3.8还是4.0"争论一整个下午。',
    '沙发马拉松': '你们都是室内跑者，在虚拟赛道上相遇。你说你今天跑了10公里Keep他说他完成了一个线上半马，互相点赞然后一起打开外卖App。最安全的约跑方式——各在各家。',
    '约跑贩子': '他组织约跑你负责响应，配合天衣无缝：他喊人你来人，跑时他聊天你跑步，跑完他合影你P图。你们是跑圈的黄金搭档——虽然你们的配速从来没对上过。',
    '气象局编外': '你们赛前都会看3天天气预报然后花1小时讨论穿衣方案。装备按温度精确分层。你们可能因为天气原因一起鸽了比赛，但至少鸽得心安理得。',
    '赤脚大仙': '你们两个都信奉极简主义，越野包比别人的腰包还轻。你们在赛道上是"极简二人组"，别人背着5公斤你们只带水袋。你们交流装备心得的方式是互相炫耀谁的东西更少。',
    '购物车跑者': '你们赛前都在纠结装备但是互补型纠结——你纠结鞋他纠结包。你们愉快地交换使用心得然后各自买了对方推荐的东西。在起点线相遇时看起来像两个移动的跑步用品店。',
    '跑圈NPC': '你们都默默跑步不发朋友圈不加跑团。赛道相遇只互相点头致意然后各自沉默跑完全程。你们的友谊不需要社交媒体证明，跑量就是最好的名片。',
    'Strava装逼犯': '你们跑完第一件事都是发Strava，互相kudos互相评论"strong effort"，然后心里暗暗比较Segment排名。你们的友谊建立在数据之上，比任何线下约跑都真实。',
    '躺完选手': '你们一起躺在沙发上看比赛直播紧张到出汗，讨论赛道策略的热情比实际参赛选手还高。"完赛感"来自精神层面。明年你们一定会报名——和今年说的一样。',
    '当年勇选手': '你们一起回忆2019年的光辉岁月互相理解"现在状态不好"的真正含义。你们的对话永远从"当年"开始到"现在"结束。你们是跑圈的活化石组合，对比赛的吐槽比比赛本身还精彩。',
    '爬坡废物': '你们在平路上飞驰一上坡就变成徒步搭子。互相说"别急慢慢走"然后下坡时一起飞奔。越野赛策略是"上坡走路下坡跑"，你们用这种方式完赛了好几场还挺开心。',
    '补给守财奴': '你们都自带补给背包比别人的还重。补给站只接水但会仔细观察每个站的供应品。你们讨论能量胶配方的热情比讨论赛道还高，是赛道上的"自给自足兄弟"。',
    '赛道遛弯大爷': '你们都把马拉松当成徒步活动，走完全程在关门时间前10分钟冲过终点。配速6分走路表情10分痛苦。完赛后做的第一件事是：找最近的面馆。你们是赛道上最快乐的二人组。',
    '退赛钉子户': '你们都理解"战略性退赛"的艺术。你退赛他理解他退赛你支持，互相分享退赛理由然后一起报名下一场"这次一定"。完赛率50%但报名率200%。',
    '5点变态': '你们都是4:50起床的狠人，空无一人的街道上相遇互相点个头就开始跑。晨跑结束时间比大多数人起床时间还早。你们是跑圈最早起的人，也是工位上最早打瞌睡的人。',
    '火锅赎罪券': '你们跑步的终点都是火锅店。精确计算跑步消耗的热量然后在火锅店超额补回来。约跑实际上是约饭，配速取决于火锅店的营业时间。你们是"运动健康"最大的讽刺。',
    '自律表演艺术家': '你们都说"看心情"然后一起不跑。偶尔约跑但每次都被"今天不太想动"打败。你们的友谊不需要赛道证明，一个"明天跑吗？"和一个"再说吧"就够了。你们是跑圈最稳定的关系——因为从不跑步所以从不吵架。',
    '数据型焦虑症晚期': '你们都盯着配速跑，谁快了慢了都要互相提醒。约跑是精确到秒的训练课，聊天内容是VO2max和乳酸阈值。你们是赛道上的"数据二人组"，别人跑步靠感觉你们靠手表。',
  }

// 构造最合拍搭子
function buildCpMatch(runnerType: string) {
  const meta = TYPE_META[runnerType]
  if (!meta || !meta.cpTypes.length) {
    return { type: '仪式感套利者', desc: '随机匹配，看缘分。', score: 75 }
  }

  const chosen = meta.cpTypes[Math.floor(Math.random() * meta.cpTypes.length)]

  return {
    type: chosen,
    desc: bestCpDescs[chosen] || '赛道也需要互补。',
    score: 82 + Math.floor(Math.random() * 12),
  }
}

// 构造最合不来搭子
function buildWorstCpMatch(runnerType: string) {
  const meta = TYPE_META[runnerType]
  if (!meta || !meta.worstTypes || meta.worstTypes.length === 0) {
    const fallback = RUNNER_TYPES.filter(t => t !== runnerType)
    const chosen = fallback[Math.floor(Math.random() * fallback.length)]
    return { type: chosen, desc: '一个向东一个向西，赛道再宽也不够你们分。', score: 10 + Math.floor(Math.random() * 15) }
  }

  const chosen = meta.worstTypes[Math.floor(Math.random() * meta.worstTypes.length)]

  const worstDescs: Record<string, string> = {
    '移动隔离舱驾驶员': '他非要拉你进跑团，你只想一个人跑。他发消息约跑，你假装没看到。',
    '仪式感套利者': '他跑完要发朋友圈，你只想回家。他觉得你不在乎，你觉得他太装。',
    '运动痕迹管理大师': '他停下来拍照，你配速被打乱。你等他构图，他觉得你不配合。',
    '意志力通货膨胀者': '他30km开始走，你在后面纠结要不要陪。陪了慢，不陪不义。',
    '报名决策狂热者': '他每次报名但不来，你替他惋惜。下次他还不来，你已经不想约了。',
    '赛道美食评论家': '他每个补给站都停，你等得脚冷。你说走吧，他说再吃一口。',
    '可穿戴设备依赖症患者': '他看手表比看你多，你说今天感觉不错，他说配速掉了5秒。',
    '沙发马拉松': '他在家跑Keep你在户外淋雨，你说一起跑他说今天线上马拉松。你们的跑步世界观完全不在一个维度——你的终点线是真实的，他的终点线是手机屏幕上的动画。',
    '约跑贩子': '他组织了20人的约跑，你只想一个人跑。他拉你进群，你设了免打扰。',
    '气象局编外': '他看天气预报决定跑不跑，你觉得矫情。下雨怎么了？他说怕滑。',
    '赤脚大仙': '他什么都不带，你担心他出事。他说没事，你觉得他在作死。',
    '购物车跑者': '他赛前还在纠结穿哪双鞋，你已经热完身了。他换了三次装备，你说走吧。',
    '跑圈NPC': '他跑5年不发朋友圈你都不知道他在跑，约他总说来不了但确实在跑。你觉得他像个跑圈幽灵，他觉得你太浮夸。你们同时出现在赛道上的概率比中签还低。',
    'Strava装逼犯': '他跑完第一件事是发Strava，你还在拉伸。他要kudos，你要回家。',
    '躺完选手': '他躺床上看直播说"我也在跑"你真在跑。他觉得你们的体验一样，你觉得他在侮辱你的完赛证书。你们的共同话题是比赛——区别是你用脚他用电。',
    '当年勇选手': '他总说当年怎样怎样，你觉得他在倚老卖老。你跑出好成绩他说"不如当年"，你跑砸了他摇头说"年轻人需要磨练"。和他跑步你永远活在2019年的阴影里。',
    '爬坡废物': '他上坡就降速，你在前面等。你说加油，他说你别走太快。',
    '补给守财奴': '他什么都不吃，你每个补给站都停。他说自给自足，你说不懂享受。',
    '赛道遛弯大爷': '他走完30公里，你跑了30公里。完赛时间差不多，但他不累你累。',
    '退赛钉子户': '他第一次退赛你说没事，第二次你说加油，第三次你说你到底行不行。',
    '5点变态': '他5点约你跑步，你还没睡醒。他8点精神抖擞，你10点还在打瞌睡。',
    '火锅赎罪券': '他跑完就吃火锅你还在减脂期，他说跑步就是为了吃你无语。每次约跑他的真实目的是跑完去哪家店，你的配速计划在火锅面前一文不值。',
    '自律表演艺术家': '他说跑不跑都行你已穿好鞋，他总鸽你还每次都约。他的"看心情"翻译过来就是"不跑"，你的认真在他的佛系面前变成了内卷。你们的关系就像一个永远在等一个永远不来。',
    '数据型焦虑症晚期': '他看配速跑步，你凭感觉。他觉得你太慢，你觉得他太卷。',
  }

  return {
    type: chosen,
    desc: worstDescs[chosen] || `一个向东一个向西，赛道再宽也不够你们分。`,
    score: 10 + Math.floor(Math.random() * 15),
  }
}

// 获取结果描述文案
export function getResultDescription(runnerType: string, isHidden: boolean): string {
  if (isHidden) {
    return '你不是不喜欢跑步，你只是更喜欢"曾经跑过"的感觉。'
  }
  const meta = TYPE_META[runnerType]
  if (meta) return `${meta.roast} ${meta.hype}`
  return `${runnerType}，这是你的跑步故事。`
}

// 获取适合的比赛
export function getSuitableRace(runnerType: string): string {
  const races: Record<string, string> = {
    '移动隔离舱驾驶员': 'UTMB（一个人跑完全程，才是真正的朝圣）',
    '仪式感套利者': '北京马拉松/上海马拉松（国马/上马，完赛证书最具仪式感）',
    '运动痕迹管理大师': '厦门马拉松/杭州马拉松（海滨+西湖，赛道就是你的影棚）',
    '意志力通货膨胀者': '半马（缩短战线，体验一次全程不停脚的快感）',
    '报名决策狂热者': '任何一场报名费低廉的赛事（押金不能白交）',
    '赛道美食评论家': '成都马拉松/广州马拉松（补给天花板，美食赛道）',
    '可穿戴设备依赖症患者': '香港100（数据党的朝圣之路，CP点精确到秒）',
    '沙发马拉松': '线上马拉松（足不出户，奖牌到家）',
    '约跑贩子': '马拉松接力赛（团队作战，你负责组局）',
    '气象局编外': '任何一场你已经查好天气预报的赛事',
    '赤脚大仙': '柴古唐斯（强制装备少，轻量化天堂）',
    '购物车跑者': '半马（装备简单，不用纠结背包）',
    '跑圈NPC': '半马/全马（去体验一次赛道的肾上腺素）',
    'Strava装逼犯': 'Strava排名赛（数据战场，每秒都要卷）',
    '躺完选手': '线上马拉松（精神能完赛，肉体也要跟上）',
    '当年勇选手': '首马（重新找回站在起点的兴奋感）',
    '爬坡废物': '半马/城市马拉松（先建立路跑信心）',
    '补给守财奴': '林贾尼100/UTMB（自补给是你的主场）',
    '赛道遛弯大爷': '徒步马拉松（能完赛就是胜利）',
    '退赛钉子户': '之前退赛的同一场比赛（这次不退）',
    '5点变态': '周末城市马拉松（早起跑完，不耽误加班）',
    '火锅赎罪券': '成都马拉松（跑完吃火锅，热量双倍燃烧）',
    '自律表演艺术家': '风景优美的越野赛（享受过程，不追成绩）',
    '数据型焦虑症晚期': '波士顿马拉松（BQ是你的信仰）',
  }

  return races[runnerType] || '马拉松 / 越野跑 / 欢乐跑'
}

// 获取比赛推荐详情
export function getRaceRecommendations(runnerType: string): Array<{
  name: string
  distance: string
  difficulty: number
  scenery: number
  supplies: number
  culture: number
  tags: string[]
}> {
  const trailRaces = [
    { name: 'UTMB', distance: '171km', difficulty: 5, scenery: 5, supplies: 4, culture: 5, tags: ['越野巅峰', '环勃朗峰'] },
    { name: '林贾尼100', distance: '100km', difficulty: 4, scenery: 5, supplies: 3, culture: 4, tags: ['火山地貌', '印尼风情'] },
    { name: '巨人之旅', distance: '330km', difficulty: 5, scenery: 5, supplies: 3, culture: 5, tags: ['意大利', '环线传奇'] },
    { name: 'HK100', distance: '100km', difficulty: 3, scenery: 4, supplies: 5, culture: 4, tags: ['麦理浩径', '亚洲最受欢迎'] },
    { name: '柴古唐斯', distance: '100km', difficulty: 4, scenery: 4, supplies: 4, culture: 4, tags: ['括苍山', '江浙沪越野'] },
    { name: '崇礼168', distance: '168km', difficulty: 4, scenery: 4, supplies: 4, culture: 3, tags: ['草原天路', '华北越野'] },
    { name: '四姑娘山', distance: '60km', difficulty: 3, scenery: 5, supplies: 3, culture: 4, tags: ['高原风光', '四川阿坝'] },
    { name: '秦岭168', distance: '168km', difficulty: 4, scenery: 4, supplies: 3, culture: 4, tags: ['秦岭古道', '西北越野'] },
    { name: '梅里100', distance: '100km', difficulty: 4, scenery: 5, supplies: 2, culture: 5, tags: ['梅里雪山', '转山'] },
    { name: '梅里之翼', distance: '56km', difficulty: 4, scenery: 5, supplies: 3, culture: 5, tags: ['梅里雪山', '日照金山'] },
    { name: '宁海越野', distance: '100km', difficulty: 3, scenery: 4, supplies: 4, culture: 3, tags: ['宁海', '华东经典'] },
    { name: '张家界天门山', distance: '70km', difficulty: 4, scenery: 5, supplies: 3, culture: 4, tags: ['天门山', '砂岩峰林'] },
    { name: '大理100', distance: '100km', difficulty: 3, scenery: 5, supplies: 3, culture: 4, tags: ['苍山洱海', '云南风情'] },
    { name: '武功山', distance: '56km', difficulty: 3, scenery: 5, supplies: 3, culture: 3, tags: ['高山草甸', '云海日出'] },
    { name: '贡嘎100', distance: '100km', difficulty: 5, scenery: 5, supplies: 2, culture: 4, tags: ['蜀山之王', '高海拔'] },
    { name: '黄山越野', distance: '50km', difficulty: 3, scenery: 5, supplies: 3, culture: 5, tags: ['黄山', '徽州文化'] },
    { name: '腾格里沙漠', distance: '100km', difficulty: 4, scenery: 4, supplies: 2, culture: 3, tags: ['沙漠', '内蒙古'] },
    { name: '玉龙雪山', distance: '50km', difficulty: 4, scenery: 5, supplies: 3, culture: 4, tags: ['玉龙雪山', '纳西族'] },
    { name: '大五朝台', distance: '70km', difficulty: 4, scenery: 4, supplies: 3, culture: 5, tags: ['五台山', '朝圣之路'] },
    { name: '莫干山', distance: '30km', difficulty: 2, scenery: 4, supplies: 4, culture: 3, tags: ['莫干山', '江浙沪入门'] },
    { name: '张掖百公里', distance: '100km', difficulty: 4, scenery: 5, supplies: 3, culture: 4, tags: ['丹霞地貌', '西北风光'] },
    { name: '三峡168', distance: '168km', difficulty: 4, scenery: 4, supplies: 3, culture: 4, tags: ['三峡', '长江风光'] },
    { name: '长白山', distance: '50km', difficulty: 3, scenery: 5, supplies: 3, culture: 3, tags: ['长白山', '天池'] },
    { name: '蜀道by UTMB', distance: '100km', difficulty: 4, scenery: 5, supplies: 4, culture: 5, tags: ['剑门关', '蜀道天险'] },
    { name: '大境门by UTMB', distance: '100km', difficulty: 3, scenery: 4, supplies: 4, culture: 4, tags: ['长城', '冬奥遗产'] },
    { name: '高黎贡超级山径', distance: '125km', difficulty: 5, scenery: 5, supplies: 3, culture: 4, tags: ['高黎贡山', '热带雨林'] },
    { name: '稻城亚丁', distance: '46km', difficulty: 5, scenery: 5, supplies: 2, culture: 5, tags: ['三神山', '天空之路'] },
    { name: '江南百英里', distance: '168km', difficulty: 2, scenery: 4, supplies: 4, culture: 3, tags: ['四明山', '首168推荐'] },
  ]

  const roadRaces = [
    { name: '北京马拉松', distance: '全马', difficulty: 3, scenery: 3, supplies: 4, culture: 5, tags: ['国马', '中轴线'] },
    { name: '上海马拉松', distance: '全马', difficulty: 3, scenery: 4, supplies: 5, culture: 4, tags: ['精英赛道', '上海腔调'] },
    { name: '厦门马拉松', distance: '全马', difficulty: 2, scenery: 5, supplies: 4, culture: 3, tags: ['海滨赛道', '高颜值'] },
    { name: '武汉马拉松', distance: '全马', difficulty: 3, scenery: 4, supplies: 4, culture: 4, tags: ['樱花季', '补给文化'] },
    { name: '成都马拉松', distance: '全马', difficulty: 3, scenery: 4, supplies: 5, culture: 4, tags: ['美食赛道', '火锅补给'] },
    { name: '西安马拉松', distance: '全马', difficulty: 2, scenery: 4, supplies: 4, culture: 5, tags: ['古城墙', '文化之旅'] },
    { name: '广州马拉松', distance: '全马', difficulty: 3, scenery: 3, supplies: 5, culture: 4, tags: ['粤语氛围', '广马补给'] },
    { name: '杭州马拉松', distance: '全马', difficulty: 2, scenery: 5, supplies: 4, culture: 4, tags: ['西湖景区', '江南韵味'] },
    { name: '深圳马拉松', distance: '全马', difficulty: 2, scenery: 4, supplies: 5, culture: 3, tags: ['年轻城市', '创新活力'] },
    { name: '重庆马拉松', distance: '全马', difficulty: 3, scenery: 3, supplies: 5, culture: 4, tags: ['火锅补给', '爬坡赛道'] },
    { name: '无锡马拉松', distance: '全马', difficulty: 2, scenery: 5, supplies: 4, culture: 3, tags: ['樱花赛道', 'PB圣地'] },
    { name: '兰州马拉松', distance: '全马', difficulty: 3, scenery: 4, supplies: 4, culture: 5, tags: ['黄河之畔', '牛肉面'] },
    { name: '南京马拉松', distance: '全马', difficulty: 2, scenery: 4, supplies: 4, culture: 5, tags: ['六朝古都', '中山陵'] },
    { name: '青岛马拉松', distance: '全马', difficulty: 2, scenery: 5, supplies: 4, culture: 3, tags: ['海滨赛道', '啤酒之城'] },
    { name: '大连马拉松', distance: '全马', difficulty: 2, scenery: 4, supplies: 4, culture: 4, tags: ['浪漫之都', '老牌赛事'] },
    { name: '千岛湖马拉松', distance: '全马', difficulty: 2, scenery: 5, supplies: 3, culture: 3, tags: ['千岛湖', '山水如画'] },
    { name: '苏州马拉松', distance: '全马', difficulty: 2, scenery: 4, supplies: 4, culture: 5, tags: ['园林之城', '江南水乡'] },
    { name: '长沙马拉松', distance: '全马', difficulty: 2, scenery: 4, supplies: 5, culture: 4, tags: ['橘子洲头', '臭豆腐补给'] },
    { name: '郑开马拉松', distance: '全马', difficulty: 1, scenery: 3, supplies: 3, culture: 4, tags: ['郑开大道', '最直赛道'] },
    { name: '海口马拉松', distance: '全马', difficulty: 2, scenery: 5, supplies: 3, culture: 3, tags: ['椰风海韵', '热带风情'] },
    { name: '珠海马拉松', distance: '全马', difficulty: 2, scenery: 4, supplies: 4, culture: 3, tags: ['情侣路', '滨海赛道'] },
    { name: '哈尔滨马拉松', distance: '全马', difficulty: 2, scenery: 3, supplies: 5, culture: 4, tags: ['最土豪补给', '俄式风情'] },
    { name: '大理马拉松', distance: '全马', difficulty: 2, scenery: 5, supplies: 3, culture: 5, tags: ['苍山洱海', '白族文化'] },
    { name: '丽江马拉松', distance: '全马', difficulty: 3, scenery: 5, supplies: 3, culture: 5, tags: ['玉龙雪山', '纳西古城'] },
    { name: '贵阳马拉松', distance: '全马', difficulty: 3, scenery: 4, supplies: 4, culture: 3, tags: ['避暑之都', '山城赛道'] },
  ]

  const typeTags: Record<string, string[]> = {
    '移动隔离舱驾驶员': ['UTMB', '巨人之旅', '贡嘎100', '梅里100'],
    '仪式感套利者': ['北京马拉松', '上海马拉松', 'HK100', '崇礼168', '江南百英里'],
    '运动痕迹管理大师': ['厦门马拉松', '杭州马拉松', '四姑娘山', '武功山', '张家界天门山', '大理马拉松'],
    '意志力通货膨胀者': ['千岛湖马拉松', '郑开马拉松', '莫干山', '江南百英里'],
    '报名决策狂热者': ['海口马拉松', '莫干山', '珠海马拉松'],
    '赛道美食评论家': ['成都马拉松', '广州马拉松', '武汉马拉松', '长沙马拉松', '重庆马拉松', '哈尔滨马拉松'],
    '可穿戴设备依赖症患者': ['HK100', '无锡马拉松', '上海马拉松'],
    '沙发马拉松': ['千岛湖马拉松', '莫干山', '郑开马拉松'],
    '约跑贩子': ['南京马拉松', '苏州马拉松', '深圳马拉松'],
    '气象局编外': ['大连马拉松', '青岛马拉松', '崇礼168'],
    '赤脚大仙': ['柴古唐斯', 'HK100', '宁海越野', '莫干山'],
    '购物车跑者': ['千岛湖马拉松', '郑开马拉松', '莫干山'],
    '跑圈NPC': ['厦门马拉松', '无锡马拉松', '莫干山'],
    'Strava装逼犯': ['无锡马拉松', '上海马拉松', 'HK100'],
    '躺完选手': ['千岛湖马拉松', '海口马拉松', '莫干山'],
    '当年勇选手': ['厦门马拉松', '南京马拉松', '莫干山', '丽江马拉松'],
    '爬坡废物': ['郑开马拉松', '千岛湖马拉松', '无锡马拉松'],
    '补给守财奴': ['林贾尼100', 'UTMB', '贡嘎100', '高黎贡超级山径'],
    '赛道遛弯大爷': ['海口马拉松', '珠海马拉松', '千岛湖马拉松', '大理马拉松'],
    '退赛钉子户': ['无锡马拉松', '宁海越野', '莫干山', '江南百英里'],
    '5点变态': ['深圳马拉松', '南京马拉松', '苏州马拉松'],
    '火锅赎罪券': ['成都马拉松', '长沙马拉松', '重庆马拉松', '哈尔滨马拉松'],
    '自律表演艺术家': ['杭州马拉松', '四姑娘山', '大理100', '武功山', '丽江马拉松'],
    '数据型焦虑症晚期': ['无锡马拉松', '上海马拉松', '北京马拉松', '蜀道by UTMB'],
  }

  const preferredTags = typeTags[runnerType] || []

  const allRaces = [...trailRaces, ...roadRaces]
  const recommended = allRaces.filter(r =>
    preferredTags.some(tag => r.name.includes(tag) || r.tags.some(t => t.includes(tag)))
  )

  if (recommended.length === 0) {
    const shuffled = [...allRaces].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 3).map(r => ({ ...r, tags: r.tags }))
  }

  return recommended.slice(0, 3).map(r => ({ ...r, tags: r.tags }))
}
