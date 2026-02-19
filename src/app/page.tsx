'use client'

import { motion } from 'framer-motion'
import { 
  Sparkles, 
  Music, 
  BookHeart, 
  Download, 
  ChevronDown,
  Star,
  Heart,
  Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'

// 动画配置
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// 角色数据
const characters = [
  {
    name: '櫻井 美月',
    title: '充滿活力的新人偶像',
    emoji: '🌸',
    color: 'from-pink-400 to-rose-500',
    description: '擁有陽光般燦爛笑容的新人，憑藉著對舞台的熱愛和不懈努力，正在偶像之路上閃閃發光。'
  },
  {
    name: '月島 夜空',
    title: '神秘優雅的實力派',
    emoji: '🌙',
    color: 'from-indigo-400 to-purple-500',
    description: '冷靜沉著的實力派偶像，以獨特的魅力和精湛的舞技征服無數粉絲的心。'
  },
  {
    name: '星野 光',
    title: '天才型的舞台王者',
    emoji: '⭐',
    color: 'from-amber-400 to-orange-500',
    description: '天生的舞台王者，擁有令人驚嘆的表演天賦，每一次演出都是視覺與聽覺的盛宴。'
  }
]

// 特色功能数据
const features = [
  {
    icon: Sparkles,
    title: '角色養成',
    description: '培養獨一無二的偶像，發展各種技能與特質。從訓練到出道，見證偶像的成長歷程。',
    color: 'text-pink-500',
    bgColor: 'bg-pink-50'
  },
  {
    icon: Music,
    title: '音樂節奏',
    description: '跟隨節拍舞動，體驗華麗的演出表演。多種難度模式，挑戰你的節奏極限。',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50'
  },
  {
    icon: BookHeart,
    title: '故事劇情',
    description: '探索豐富的故事線，與角色建立深厚羈絆。每個選擇都將影響偶像的命運。',
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50'
  }
]

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      {/* 导航栏 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Star className="w-6 h-6 text-purple-600 fill-purple-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Astro
              </span>
            </motion.div>
            <motion.div 
              className="hidden md:flex items-center gap-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <a href="#about" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">遊戲介紹</a>
              <a href="#characters" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">角色</a>
              <a href="#download" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">下載</a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full px-6">
                立即開始
              </Button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero 区域 */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 背景渐变 */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400" />
        
        {/* 装饰元素 */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Hero 内容 */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-white/90 text-sm font-medium">全新偶像培育體驗</span>
            </div>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block">🌟</span>
            <br />
            Astro 候補生計劃
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl text-white/90 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            成為閃耀的偶像，開啟你的演藝之路
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button 
              size="lg" 
              className="bg-white text-purple-600 hover:bg-gray-100 rounded-full px-8 py-6 text-lg font-semibold shadow-xl"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              了解更多
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg font-semibold"
            >
              <Download className="w-5 h-5 mr-2" />
              立即下載
            </Button>
          </motion.div>
        </div>

        {/* 向下滚动提示 */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-white/70" />
        </motion.div>
      </section>

      {/* 游戏简介区域 */}
      <section id="about" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              遊戲簡介
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              探索 Astro 候補生計劃的三大核心玩法，開啟你的偶像之旅
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 角色展示区域 */}
      <section id="characters" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              登場角色
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              與三位性格迥異的偶像候補生一起，書寫屬於你們的演藝故事
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {characters.map((character, index) => (
              <motion.div
                key={index}
                className="group relative"
                variants={fadeInUp}
              >
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                  {/* 角色头像区域 */}
                  <div className={`h-48 bg-gradient-to-br ${character.color} flex items-center justify-center relative overflow-hidden`}>
                    <motion.div
                      className="text-8xl"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {character.emoji}
                    </motion.div>
                    {/* 装饰光效 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  
                  {/* 角色信息 */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {character.name}
                    </h3>
                    <p className={`text-sm font-medium bg-gradient-to-r ${character.color} bg-clip-text text-transparent mb-3`}>
                      {character.title}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {character.description}
                    </p>
                  </div>

                  {/* 悬停效果 */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-200 rounded-3xl transition-colors duration-300" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 游戏特色统计 */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {[
              { number: '100+', label: '原創歌曲', icon: Music },
              { number: '50+', label: '故事章節', icon: BookHeart },
              { number: '30+', label: '可培養角色', icon: Heart },
              { number: '1M+', label: '活躍玩家', icon: Zap },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-white"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <stat.icon className="w-8 h-8 mx-auto mb-2 opacity-80" />
                <div className="text-4xl md:text-5xl font-bold mb-1">{stat.number}</div>
                <div className="text-white/80 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 下载区域 */}
      <section id="download" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              下載遊戲
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              現在下載，開啟你的偶像培育之旅
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* iOS 下载按钮 */}
            <motion.a
              href="#"
              className="group flex items-center gap-4 bg-black text-white px-8 py-4 rounded-2xl hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <div className="text-left">
                <div className="text-xs text-gray-400">Download on the</div>
                <div className="text-xl font-semibold">App Store</div>
              </div>
            </motion.a>

            {/* Android 下载按钮 */}
            <motion.a
              href="#"
              className="group flex items-center gap-4 bg-black text-white px-8 py-4 rounded-2xl hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.523 15.341c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9m-11.046 0c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9m11.405-6.02l1.997-3.46a.416.416 0 00-.152-.567.416.416 0 00-.568.152L17.117 8.97c-1.451-.67-3.085-1.044-4.85-1.044-1.766 0-3.4.374-4.85 1.044L5.297 5.446a.416.416 0 00-.568-.152.416.416 0 00-.152.567l1.997 3.46C3.066 11.09 1 14.133 1 17.629h22c0-3.496-2.066-6.539-5.118-8.308M1 17.629h22v1.456H1v-1.456z"/>
              </svg>
              <div className="text-left">
                <div className="text-xs text-gray-400">GET IT ON</div>
                <div className="text-xl font-semibold">Google Play</div>
              </div>
            </motion.a>
          </motion.div>

          {/* 额外信息 */}
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-gray-500 text-sm">
              * 支援 iOS 14.0 以上 / Android 8.0 以上版本
            </p>
          </motion.div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Logo 和简介 */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-6 h-6 text-purple-400 fill-purple-400" />
                <span className="text-xl font-bold">Astro 候補生計劃</span>
              </div>
              <p className="text-gray-400 max-w-md">
                成為閃耀的偶像，開啟你的演藝之路。Astro 候補生計劃是一款結合角色養成、音樂節奏與故事劇情的偶像培育遊戲。
              </p>
            </div>

            {/* 快速链接 */}
            <div>
              <h4 className="font-semibold mb-4">快速連結</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-white transition-colors">遊戲介紹</a></li>
                <li><a href="#characters" className="hover:text-white transition-colors">角色介紹</a></li>
                <li><a href="#download" className="hover:text-white transition-colors">下載遊戲</a></li>
              </ul>
            </div>

            {/* 支持 */}
            <div>
              <h4 className="font-semibold mb-4">支援</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">常見問題</a></li>
                <li><a href="#" className="hover:text-white transition-colors">聯絡我們</a></li>
                <li><a href="#" className="hover:text-white transition-colors">隱私政策</a></li>
              </ul>
            </div>
          </div>

          {/* 版权信息 */}
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
            <p>© 2024 Astro 候補生計劃. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
