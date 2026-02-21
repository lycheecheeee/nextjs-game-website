'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Play, Pause, RotateCcw, Music, Star, Zap, Heart } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// 游戏配置
const GAME_CONFIG = {
  lanes: ['D', 'F', 'J', 'K'],
  laneColors: ['bg-pink-500', 'bg-purple-500', 'bg-indigo-500', 'bg-blue-500'],
  noteSpeed: 4, // 秒
  spawnInterval: 800, // 毫秒
  perfectWindow: 50, // px
  goodWindow: 100, // px
}

// 音符类型
interface Note {
  id: number
  lane: number
  y: number
  hit: boolean
  missed: boolean
}

// 评分类型
type ScoreType = 'perfect' | 'good' | 'miss'

export default function GamePage() {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'paused' | 'ended'>('idle')
  const [notes, setNotes] = useState<Note[]>([])
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [maxCombo, setMaxCombo] = useState(0)
  const [hitFeedback, setHitFeedback] = useState<{ type: ScoreType; lane: number } | null>(null)
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set())
  
  const noteIdRef = useRef(0)
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null)
  const spawnLoopRef = useRef<NodeJS.Timeout | null>(null)

  // 生成随机音符
  const spawnNote = useCallback(() => {
    const lane = Math.floor(Math.random() * 4)
    setNotes(prev => [...prev, {
      id: noteIdRef.current++,
      lane,
      y: 0,
      hit: false,
      missed: false
    }])
  }, [])

  // 更新音符位置
  const updateNotes = useCallback(() => {
    setNotes(prev => {
      const gameHeight = 500 // 游戏区域高度
      const hitZoneY = gameHeight - 80 // 判定线位置
      
      return prev
        .map(note => ({
          ...note,
          y: note.y + 8
        }))
        .filter(note => {
          // 移除已击中或超出屏幕的音符
          if (note.hit) return false
          if (note.y > hitZoneY + GAME_CONFIG.goodWindow && !note.missed) {
            // 标记为错过
            setCombo(0)
            setHitFeedback({ type: 'miss', lane: note.lane })
            setTimeout(() => setHitFeedback(null), 300)
            return false
          }
          return note.y < gameHeight
        })
    })
  }, [])

  // 开始游戏
  const startGame = () => {
    setGameState('playing')
    setNotes([])
    setScore(0)
    setCombo(0)
    setMaxCombo(0)
    noteIdRef.current = 0
    
    // 开始生成音符
    spawnLoopRef.current = setInterval(spawnNote, GAME_CONFIG.spawnInterval)
    // 开始游戏循环
    gameLoopRef.current = setInterval(updateNotes, 16)
  }

  // 暂停游戏
  const pauseGame = () => {
    setGameState('paused')
    if (spawnLoopRef.current) clearInterval(spawnLoopRef.current)
    if (gameLoopRef.current) clearInterval(gameLoopRef.current)
  }

  // 继续游戏
  const resumeGame = () => {
    setGameState('playing')
    spawnLoopRef.current = setInterval(spawnNote, GAME_CONFIG.spawnInterval)
    gameLoopRef.current = setInterval(updateNotes, 16)
  }

  // 结束游戏
  const endGame = () => {
    setGameState('ended')
    if (spawnLoopRef.current) clearInterval(spawnLoopRef.current)
    if (gameLoopRef.current) clearInterval(gameLoopRef.current)
  }

  // 击打音符
  const hitNote = useCallback((laneIndex: number) => {
    const hitZoneY = 420 // 判定线位置
    
    setNotes(prev => {
      const noteToHit = prev.find(note => 
        note.lane === laneIndex && 
        !note.hit && 
        !note.missed &&
        Math.abs(note.y - hitZoneY) < GAME_CONFIG.goodWindow
      )
      
      if (noteToHit) {
        const distance = Math.abs(noteToHit.y - hitZoneY)
        let type: ScoreType = 'miss'
        let points = 0
        
        if (distance < GAME_CONFIG.perfectWindow) {
          type = 'perfect'
          points = 100
        } else if (distance < GAME_CONFIG.goodWindow) {
          type = 'good'
          points = 50
        }
        
        if (type !== 'miss') {
          setScore(s => s + points * (1 + combo * 0.1))
          setCombo(c => {
            const newCombo = c + 1
            setMaxCombo(m => Math.max(m, newCombo))
            return newCombo
          })
          setHitFeedback({ type, lane: laneIndex })
          setTimeout(() => setHitFeedback(null), 300)
          
          return prev.map(note => 
            note.id === noteToHit.id ? { ...note, hit: true } : note
          )
        }
      }
      
      return prev
    })
  }, [combo])

  // 键盘事件
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase()
      const laneIndex = GAME_CONFIG.lanes.indexOf(key)
      
      if (laneIndex !== -1 && gameState === 'playing') {
        setPressedKeys(prev => new Set(prev).add(key))
        hitNote(laneIndex)
      }
      
      // ESC 暂停
      if (e.key === 'Escape' && gameState === 'playing') {
        pauseGame()
      }
    }
    
    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase()
      setPressedKeys(prev => {
        const newSet = new Set(prev)
        newSet.delete(key)
        return newSet
      })
    }
    
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [gameState, hitNote])

  // 清理
  useEffect(() => {
    return () => {
      if (spawnLoopRef.current) clearInterval(spawnLoopRef.current)
      if (gameLoopRef.current) clearInterval(gameLoopRef.current)
    }
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* 导航栏 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">返回首頁</span>
          </Link>
          <div className="flex items-center gap-2">
            <Music className="w-6 h-6 text-purple-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              節奏遊戲
            </span>
          </div>
          <div className="w-20" />
        </div>
      </nav>

      <div className="pt-24 pb-8 px-4 flex flex-col items-center">
        {/* 游戏标题 */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            🎵 音樂節奏挑戰
          </h1>
          <p className="text-gray-400">使用 D, F, J, K 鍵擊打音符</p>
        </motion.div>

        {/* 分数显示 */}
        <motion.div 
          className="flex gap-8 mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-white">{Math.floor(score)}</div>
            <div className="text-sm text-gray-400">分數</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400">{combo}</div>
            <div className="text-sm text-gray-400">連擊</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400">{maxCombo}</div>
            <div className="text-sm text-gray-400">最大連擊</div>
          </div>
        </motion.div>

        {/* 游戏区域 */}
        <motion.div 
          className="relative bg-black/50 rounded-2xl overflow-hidden border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* 游戏画布 */}
          <div className="relative w-[320px] h-[500px]">
            {/* 轨道 */}
            <div className="absolute inset-0 flex">
              {GAME_CONFIG.lanes.map((lane, i) => (
                <div 
                  key={lane}
                  className={`flex-1 border-r border-white/10 last:border-r-0 ${
                    pressedKeys.has(lane) ? 'bg-white/10' : ''
                  } transition-colors`}
                />
              ))}
            </div>

            {/* 判定线 */}
            <div className="absolute bottom-20 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 shadow-lg shadow-purple-500/50" />

            {/* 音符 */}
            <AnimatePresence>
              {notes.map(note => (
                <motion.div
                  key={note.id}
                  className={`absolute w-[78px] h-6 rounded-lg ${GAME_CONFIG.laneColors[note.lane]} shadow-lg`}
                  style={{
                    left: `${note.lane * 80 + 1}px`,
                    top: `${note.y}px`,
                  }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 0.1 }}
                />
              ))}
            </AnimatePresence>

            {/* 击打反馈 */}
            <AnimatePresence>
              {hitFeedback && (
                <motion.div
                  className="absolute bottom-24 left-0 right-0 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <span className={`text-2xl font-bold ${
                    hitFeedback.type === 'perfect' ? 'text-yellow-400' :
                    hitFeedback.type === 'good' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {hitFeedback.type === 'perfect' ? 'PERFECT!' :
                     hitFeedback.type === 'good' ? 'GOOD!' : 'MISS...'}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 按键提示 */}
            <div className="absolute bottom-0 left-0 right-0 h-20 flex bg-black/80">
              {GAME_CONFIG.lanes.map((lane, i) => (
                <div 
                  key={lane}
                  className={`flex-1 flex items-center justify-center border-r border-white/10 last:border-r-0 ${
                    pressedKeys.has(lane) ? 'bg-white/20' : ''
                  } transition-colors`}
                >
                  <span className={`text-2xl font-bold ${
                    pressedKeys.has(lane) ? 'text-white' : 'text-gray-500'
                  }`}>
                    {lane}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 控制按钮 */}
        <motion.div 
          className="flex gap-4 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {gameState === 'idle' && (
            <Button 
              size="lg"
              onClick={startGame}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full px-8"
            >
              <Play className="w-5 h-5 mr-2" />
              開始遊戲
            </Button>
          )}
          
          {gameState === 'playing' && (
            <>
              <Button 
                size="lg"
                onClick={pauseGame}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 rounded-full px-6"
              >
                <Pause className="w-5 h-5 mr-2" />
                暫停
              </Button>
              <Button 
                size="lg"
                onClick={endGame}
                variant="outline"
                className="border-red-500/50 text-red-400 hover:bg-red-500/10 rounded-full px-6"
              >
                結束遊戲
              </Button>
            </>
          )}
          
          {gameState === 'paused' && (
            <>
              <Button 
                size="lg"
                onClick={resumeGame}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-full px-8"
              >
                <Play className="w-5 h-5 mr-2" />
                繼續
              </Button>
              <Button 
                size="lg"
                onClick={endGame}
                variant="outline"
                className="border-red-500/50 text-red-400 hover:bg-red-500/10 rounded-full px-6"
              >
                結束遊戲
              </Button>
            </>
          )}
          
          {gameState === 'ended' && (
            <Button 
              size="lg"
              onClick={startGame}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full px-8"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              重新開始
            </Button>
          )}
        </motion.div>

        {/* 游戏说明 */}
        <motion.div 
          className="mt-8 text-center text-gray-400 text-sm max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="mb-2">💡 遊戲提示</p>
          <ul className="space-y-1">
            <li>• 當音符到達底部判定線時按下對應按鍵</li>
            <li>• PERFECT = 100分，GOOD = 50分</li>
            <li>• 連擊會獲得額外加分</li>
            <li>• 按 ESC 暫停遊戲</li>
          </ul>
        </motion.div>

        {/* 游戏结束统计 */}
        <AnimatePresence>
          {gameState === 'ended' && score > 0 && (
            <motion.div
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-gradient-to-br from-purple-900 to-pink-900 p-8 rounded-3xl border border-white/20 text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold text-white mb-6">🎉 遊戲結束！</h2>
                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div className="bg-white/10 rounded-xl p-4">
                    <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{Math.floor(score)}</div>
                    <div className="text-sm text-gray-400">總分</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <Zap className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{maxCombo}</div>
                    <div className="text-sm text-gray-400">最大連擊</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <Heart className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{Math.floor(score / 100)}</div>
                    <div className="text-sm text-gray-400">擊中數</div>
                  </div>
                </div>
                <Button 
                  size="lg"
                  onClick={startGame}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full px-8"
                >
                  再玩一次
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
