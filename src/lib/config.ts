export default {
  appName: '跑圈SBTI',
  appSlogan: '你是哪种跑者？',
  version: '4.0.0',
  totalQuestions: 32,
  questionPoolSize: 151,
  dimensions: [
    { id: 'A1', name: '动机与身份认同', poolSize: 18, perTest: 4 },
    { id: 'A2', name: '赛道行为模式', poolSize: 16, perTest: 4 },
    { id: 'A3', name: '装备与仪式', poolSize: 19, perTest: 4 },
    { id: 'A4', name: '赛前与赛后', poolSize: 21, perTest: 4 },
    { id: 'A5', name: '自我认知', poolSize: 15, perTest: 4 },
    { id: 'B1', name: '吃苦与享乐', poolSize: 15, perTest: 3 },
    { id: 'B2', name: '装备与强制', poolSize: 15, perTest: 3 },
    { id: 'B3', name: '爬升与技术', poolSize: 15, perTest: 3 },
    { id: 'B4', name: '风景与完赛', poolSize: 17, perTest: 3 },
  ],
  soulQuestions: [
    { dimension: 'A2', index: 3, id: 'A4' },
    { dimension: 'A1', index: 10, id: 'A11' },
    { dimension: 'A5', index: 17, id: 'A24' },
    { dimension: 'B1', index: 24, id: 'B8' },
    { dimension: 'A5', index: 31, id: 'A30' },
    { dimension: 'A1', index: 38, id: 'A15' },
  ],
  eggTriggers: {
    cloudRunner: { type: 'hidden', threshold: 8, category: 'A', options: ['D'] },
    mountainAscetic: { type: 'label', threshold: 4, category: 'B', options: ['A', 'C'] },
    mountainHedonist: { type: 'label', threshold: 4, category: 'B', options: ['B', 'D'] },
  },
  // 24种角色列表
  runnerTypes: [
    '独行侠', '完赛怪', '拍照精', '撞墙王',
    '号码布收藏家', '补给站流浪者', 'Garmin信徒', 'Keep原住民',
    '跑团团长', '赛道天气预报员', '装备极简主义者', '装备焦虑者',
    '素人跑者', '赛博跑者', '精神完赛者', '回归初心型',
    '爬山遇难型', '自补给大师', '散步跑者', 'DNF重生者',
    '打工人跑者', '刷脂战士', '佛系跑者', '卷王',
  ],
  // 彩蛋注释
  eggSymbols: ['💔', '🏔️', '☀️', '🔥', '🏆', '🌿', '📸', '⚡'],
}
