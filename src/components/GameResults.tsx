import { RotateCcw, Home } from 'lucide-react';
import { cn } from '../lib/utils';

interface GameResultsProps {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeElapsed: number;
  onPlayAgain: () => void;
  onBackToHome: () => void;
}

export function GameResults({
  score,
  correctAnswers,
  totalQuestions,
  timeElapsed,
  onPlayAgain,
  onBackToHome
}: GameResultsProps) {
  const getScoreMessage = () => {
    if (score >= 90) return { message: '优秀! (Excellent!)', emoji: '🏆', color: 'text-yellow-600' };
    if (score >= 70) return { message: '很好! (Very Good!)', emoji: '⭐', color: 'text-green-600' };
    if (score >= 50) return { message: '不错! (Good!)', emoji: '👍', color: 'text-blue-600' };
    return { message: '继续努力! (Keep Trying!)', emoji: '💪', color: 'text-purple-600' };
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const scoreInfo = getScoreMessage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Score Display */}
          <div className="mb-8">
            <div className="text-6xl mb-4">{scoreInfo.emoji}</div>
            <h1 className={cn('text-3xl font-bold mb-2', scoreInfo.color)}>
              {score}%
            </h1>
            <p className={cn('text-lg font-semibold', scoreInfo.color)}>
              {scoreInfo.message}
            </p>
          </div>

          {/* Stats */}
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Correct Answers</span>
              <span className="font-semibold text-green-600">
                {correctAnswers}/{totalQuestions}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Time Elapsed</span>
              <span className="font-semibold text-blue-600">
                {formatTime(timeElapsed)}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Accuracy</span>
              <span className="font-semibold text-purple-600">
                {Math.round((correctAnswers / totalQuestions) * 100)}%
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={onPlayAgain}
              className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
            >
              <RotateCcw className="w-5 h-5" />
              Play Again
            </button>
            
            <button
              onClick={onBackToHome}
              className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </button>
          </div>

          {/* Motivational Message */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              Keep practicing to improve your Chinese vocabulary! 
              <br />
              <span className="font-medium">坚持就是胜利!</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
