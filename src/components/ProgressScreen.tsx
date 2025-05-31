import { ChevronLeft, TrendingUp, Calendar, Target, Award } from 'lucide-react';
import type { GameStats } from '../types/game';

interface ProgressScreenProps {
  stats: GameStats;
  onBack: () => void;
}

export function ProgressScreen({ stats, onBack }: ProgressScreenProps) {
  const achievements = [
    { 
      title: 'First Steps', 
      description: 'Completed your first game', 
      unlocked: stats.totalGamesPlayed >= 1,
      icon: '🎯'
    },
    { 
      title: 'Dedicated Learner', 
      description: 'Played 10 games', 
      unlocked: stats.totalGamesPlayed >= 10,
      icon: '📚'
    },
    { 
      title: 'Vocabulary Master', 
      description: 'Learned 50 words', 
      unlocked: stats.totalWordsLearned >= 50,
      icon: '🧠'
    },
    { 
      title: 'Perfectionist', 
      description: 'Achieved 100% on a game', 
      unlocked: stats.averageScore >= 100,
      icon: '⭐'
    },
    { 
      title: 'Streak Master', 
      description: 'Maintained a 7-day streak', 
      unlocked: stats.streak >= 7,
      icon: '🔥'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-2xl font-bold text-gray-800 ml-4">Your Progress</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold text-gray-800">{stats.totalGamesPlayed}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Games Played</h3>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-8 h-8 text-green-500" />
              <span className="text-2xl font-bold text-gray-800">{stats.totalWordsLearned}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Words Learned</h3>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Award className="w-8 h-8 text-purple-500" />
              <span className="text-2xl font-bold text-gray-800">{Math.round(stats.averageScore)}%</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Average Score</h3>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-8 h-8 text-orange-500" />
              <span className="text-2xl font-bold text-gray-800">{stats.streak}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Day Streak</h3>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  achievement.unlocked 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${
                      achievement.unlocked ? 'text-green-800' : 'text-gray-600'
                    }`}>
                      {achievement.title}
                    </h3>
                    <p className={`text-sm ${
                      achievement.unlocked ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {achievement.description}
                    </p>
                  </div>
                  {achievement.unlocked && (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Tips */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Learning Tips</h2>
          <div className="space-y-3 text-gray-600">
            <p className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              Practice daily for better retention - consistency is key!
            </p>
            <p className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              Focus on pronunciation by reading pinyin aloud
            </p>
            <p className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              Try different game modes to reinforce learning
            </p>
            <p className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              Review words you got wrong in previous sessions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
