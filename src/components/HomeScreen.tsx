import { BookOpen, Trophy, Settings } from 'lucide-react';
import type { GameMode } from '../types/game';
import { cn } from '../lib/utils';

interface HomeScreenProps {
  onStartGame: (mode: GameMode) => void;
  onViewProgress: () => void;
}

const gameModes: { mode: GameMode; title: string; description: string; icon: React.ReactNode; color: string }[] = [
  {
    mode: 'chinese-to-meaning',
    title: 'Chinese → Meaning',
    description: 'See Chinese characters, choose the meaning',
    icon: <BookOpen className="w-6 h-6" />,
    color: 'bg-blue-500 hover:bg-blue-600'
  },
  {
    mode: 'meaning-to-chinese',
    title: 'Meaning → Chinese',
    description: 'See meaning, choose the Chinese character',
    icon: <BookOpen className="w-6 h-6" />,
    color: 'bg-green-500 hover:bg-green-600'
  },
  {
    mode: 'pinyin-to-chinese',
    title: 'Pinyin → Chinese',
    description: 'See pinyin, choose the Chinese character',
    icon: <BookOpen className="w-6 h-6" />,
    color: 'bg-purple-500 hover:bg-purple-600'
  },
  {
    mode: 'chinese-to-pinyin',
    title: 'Chinese → Pinyin',
    description: 'See Chinese character, choose the pinyin',
    icon: <BookOpen className="w-6 h-6" />,
    color: 'bg-orange-500 hover:bg-orange-600'
  }
];

export function HomeScreen({ onStartGame, onViewProgress }: HomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            汉语学习
          </h1>
          <p className="text-xl text-gray-600 mb-2">Chinese Word Learning Game</p>
          <p className="text-gray-500">Master Chinese vocabulary with interactive games</p>        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {gameModes.map((mode) => (
            <button
              key={mode.mode}
              onClick={() => onStartGame(mode.mode)}
              className={cn(
                'p-6 rounded-xl text-white transition-all duration-200 transform hover:scale-105 shadow-lg',
                mode.color
              )}
            >
              <div className="flex items-center justify-center mb-3">
                {mode.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{mode.title}</h3>
              <p className="text-sm opacity-90">{mode.description}</p>
            </button>
          ))}
        </div>        <div className="flex gap-4 justify-center">
          <button
            onClick={onViewProgress}
            className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <Trophy className="w-5 h-5" />
            View Progress
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <Settings className="w-5 h-5" />
            Settings
          </button>
        </div>

        <div className="text-center mt-6 text-gray-500 text-sm">
        </div>
      </div>
    </div>
  );
}
