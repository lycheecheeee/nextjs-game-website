'use client'

import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Star, 
  Heart, 
  Music, 
  Sparkles,
  Calendar,
  MapPin,
  Mic,
  Users
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

// 角色数据
const characters = [
  {
    id: 1,
    name: '櫻井 美月',
    nameEn: 'Sakurai Miki',
    title: '充滿活力的新人偶像',
    emoji: '🌸',
    color: 'from-pink-400 to-rose-500',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200',
    textColor: 'text-pink-600',
    age: 16,
    birthday: '4月5日',
    height: '158cm',
    bloodType: 'O型',
    hometown: '東京都',
    specialty: '舞蹈、鋼琴',
    hobby: '烘焙甜點、看動漫',
    description: '擁有陽光般燦爛笑容的新人偶像，憑藉著對舞台的熱愛和不懈努力，正在偶像之路上閃閃發光。雖然經驗尚淺，但她那股不服輸的勁頭和真誠的性格感染著身邊的每一個人。',
    backstory: '從小就夢想成為偶像的美月，在高中入學時偶然看到了一場震撼心靈的演唱會，從此堅定了自己的夢想。她加入了學校的偶像社團，從零開始學習唱歌、跳舞。雖然起步較晚，但她憑藉著驚人的毅力和天生的舞台魅力，很快成為了社團的核心成員。',
    skills: [
      { name: '舞蹈', level: 85, icon: '💃' },
      { name: '歌唱', level: 75, icon: '🎤' },
      { name: '表演', level: 80, icon: '🎭' },
      { name: '魅力', level: 90, icon: '✨' },
    ],
    quotes: [
      '只要不放棄，夢想一定會實現！',
      '今天的努力，就是明天的閃耀！',
      '我想成為能讓大家露出笑容的偶像！'
    ],
    likes: 12500,
    fans: 8900
  },
  {
    id: 2,
    name: '月島 夜空',
    nameEn: 'Tsukishima Yozora',
    title: '神秘優雅的實力派',
    emoji: '🌙',
    color: 'from-indigo-400 to-purple-500',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    textColor: 'text-indigo-600',
    age: 17,
    birthday: '10月31日',
    height: '165cm',
    bloodType: 'A型',
    hometown: '京都府',
    specialty: '芭蕾舞、小提琴',
    hobby: '閱讀、觀星',
    description: '冷靜沉著的實力派偶像，以獨特的魅力和精湛的舞技征服無數粉絲的心。她總是保持著優雅的姿態，但內心深處卻藏著對偶像事業的無比熱情。',
    backstory: '出生於傳統藝術世家的夜空，從小就接受嚴格的芭蕾舞和小提琴訓練。原本被期望成為古典音樂家的她，在一次偶然的機會中接觸到了偶像文化，被那種能夠直接與觀眾心靈相通的表演形式深深吸引。她毅然決定追隨自己的內心，踏上了偶像之路。',
    skills: [
      { name: '舞蹈', level: 95, icon: '💃' },
      { name: '歌唱', level: 85, icon: '🎤' },
      { name: '表演', level: 90, icon: '🎭' },
      { name: '魅力', level: 88, icon: '✨' },
    ],
    quotes: [
      '舞台是我的歸宿，舞蹈是我的語言。',
      '不需要言語，讓表演來訴說一切。',
      '在星空下，每個人都是平等的夢想家。'
    ],
    likes: 18200,
    fans: 12500
  },
  {
    id: 3,
    name: '星野 光',
    nameEn: 'Hoshino Hikaru',
    title: '天才型的舞台王者',
    emoji: '⭐',
    color: 'from-amber-400 to-orange-500',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-600',
    age: 18,
    birthday: '7月20日',
    height: '172cm',
    bloodType: 'B型',
    hometown: '大阪府',
    specialty: '作詞作曲、吉他',
    hobby: '街頭表演、電玩遊戲',
    description: '天生的舞台王者，擁有令人驚嘆的表演天賦，每一次演出都是視覺與聽覺的盛宴。他輕鬆自在的態度下，是對音樂和表演的無比執著。',
    backstory: '從小就在街頭表演的光，憑藉著天生的音樂才華和獨特的個人魅力，很快在地下音樂圈嶄露頭角。他能夠輕鬆地創作出打動人心的歌曲，並且擁有讓任何舞台都為之沸騰的表演能力。雖然表面上看似隨性，但對於音樂創作卻有著近乎偏執的追求。',
    skills: [
      { name: '舞蹈', level: 88, icon: '💃' },
      { name: '歌唱', level: 95, icon: '🎤' },
      { name: '表演', level: 92, icon: '🎭' },
      { name: '魅力', level: 95, icon: '✨' },
    ],
    quotes: [
      '音樂是靈魂的語言，讓我們一起說話吧！',
      '沒有什麼比看到觀眾的笑容更讓人滿足的了。',
      '每一次表演，都是一次全新的冒險！'
    ],
    likes: 25000,
    fans: 18000
  }
]

// 动画配置
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
}

export default function CharactersPage() {
  const [selectedCharacter, setSelectedCharacter] = useState<typeof characters[0] | null>(null)

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      {/* 导航栏 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">返回首頁</span>
          </Link>
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-purple-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              角色介紹
            </span>
          </div>
          <div className="w-20" />
        </div>
      </nav>

      <div className="pt-24 pb-16 px-4">
        {/* 页面标题 */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🌟 登場角色
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            與三位性格迥異的偶像候補生一起，書寫屬於你們的演藝故事
          </p>
        </motion.div>

        {/* 角色卡片网格 */}
        <motion.div 
          className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {characters.map((character) => (
            <motion.div
              key={character.id}
              className="group cursor-pointer"
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedCharacter(character)}
            >
              <div className={`relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-2 ${character.borderColor}`}>
                {/* 角色头像区域 */}
                <div className={`h-56 bg-gradient-to-br ${character.color} flex items-center justify-center relative overflow-hidden`}>
                  <motion.div
                    className="text-9xl"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {character.emoji}
                  </motion.div>
                  {/* 装饰光效 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  
                  {/* 粉丝数 */}
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <Heart className="w-4 h-4 text-white" />
                    <span className="text-white text-sm font-medium">{(character.likes / 1000).toFixed(1)}K</span>
                  </div>
                </div>
                
                {/* 角色信息 */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {character.name}
                    </h3>
                    <span className={`text-sm font-medium ${character.textColor} bg-opacity-20 px-2 py-1 rounded-full ${character.bgColor}`}>
                      {character.age}歲
                    </span>
                  </div>
                  <p className={`text-sm font-medium bg-gradient-to-r ${character.color} bg-clip-text text-transparent mb-3`}>
                    {character.title}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                    {character.description}
                  </p>
                  
                  {/* 技能预览 */}
                  <div className="mt-4 flex gap-2">
                    {character.skills.slice(0, 3).map((skill, i) => (
                      <span key={i} className="text-lg" title={skill.name}>
                        {skill.icon}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 查看详情按钮 */}
                <div className={`px-6 pb-6`}>
                  <button className={`w-full py-3 rounded-xl bg-gradient-to-r ${character.color} text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                    查看詳情
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 角色详情弹窗 */}
        {selectedCharacter && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedCharacter(null)}
          >
            <motion.div
              className={`bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 ${selectedCharacter.borderColor}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* 头部 */}
              <div className={`h-48 bg-gradient-to-br ${selectedCharacter.color} relative flex items-center justify-center`}>
                <span className="text-8xl">{selectedCharacter.emoji}</span>
                <button 
                  onClick={() => setSelectedCharacter(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* 内容 */}
              <div className="p-8">
                {/* 基本信息 */}
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 mb-1">{selectedCharacter.name}</h2>
                  <p className="text-gray-500">{selectedCharacter.nameEn}</p>
                  <p className={`text-sm font-medium bg-gradient-to-r ${selectedCharacter.color} bg-clip-text text-transparent mt-1`}>
                    {selectedCharacter.title}
                  </p>
                </div>

                {/* 详细资料 */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">生日：{selectedCharacter.birthday}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">家鄉：{selectedCharacter.hometown}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Star className="w-4 h-4" />
                    <span className="text-sm">身高：{selectedCharacter.height}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">血型：{selectedCharacter.bloodType}</span>
                  </div>
                </div>

                {/* 特长和爱好 */}
                <div className="mb-6">
                  <div className="flex gap-4 text-sm">
                    <div className="bg-gray-100 rounded-lg px-3 py-2">
                      <span className="text-gray-500">特長：</span>
                      <span className="text-gray-700 ml-1">{selectedCharacter.specialty}</span>
                    </div>
                    <div className="bg-gray-100 rounded-lg px-3 py-2">
                      <span className="text-gray-500">愛好：</span>
                      <span className="text-gray-700 ml-1">{selectedCharacter.hobby}</span>
                    </div>
                  </div>
                </div>

                {/* 简介 */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">角色簡介</h3>
                  <p className="text-gray-600 leading-relaxed">{selectedCharacter.description}</p>
                </div>

                {/* 背景故事 */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">背景故事</h3>
                  <p className="text-gray-600 leading-relaxed">{selectedCharacter.backstory}</p>
                </div>

                {/* 技能数值 */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">能力數值</h3>
                  <div className="space-y-3">
                    {selectedCharacter.skills.map((skill, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="text-xl w-8">{skill.icon}</span>
                        <span className="text-gray-700 w-12">{skill.name}</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${selectedCharacter.color}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                          />
                        </div>
                        <span className="text-gray-500 text-sm w-8">{skill.level}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 名言 */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">經典名言</h3>
                  <div className="space-y-2">
                    {selectedCharacter.quotes.map((quote, i) => (
                      <div key={i} className="bg-gray-50 rounded-lg px-4 py-3 text-gray-600 italic">
                        "{quote}"
                      </div>
                    ))}
                  </div>
                </div>

                {/* 粉丝统计 */}
                <div className="flex justify-center gap-8 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-pink-500 mb-1">
                      <Heart className="w-5 h-5 fill-pink-500" />
                      <span className="text-2xl font-bold">{(selectedCharacter.likes / 1000).toFixed(1)}K</span>
                    </div>
                    <span className="text-sm text-gray-500">喜歡</span>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-purple-500 mb-1">
                      <Users className="w-5 h-5" />
                      <span className="text-2xl font-bold">{(selectedCharacter.fans / 1000).toFixed(1)}K</span>
                    </div>
                    <span className="text-sm text-gray-500">粉絲</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* 底部提示 */}
        <motion.div 
          className="text-center mt-12 text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>點擊角色卡片查看詳細資料</p>
        </motion.div>
      </div>
    </main>
  )
}
