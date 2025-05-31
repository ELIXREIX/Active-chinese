import { useState, useEffect } from 'react';
import { ChevronLeft, Volume2, CheckCircle, XCircle } from 'lucide-react';
import type { Question, GameMode } from '../types/game';
import { cn } from '../lib/utils';

interface GameScreenProps {
  question: Question;
  gameMode: GameMode;
  currentQuestionNumber: number;
  totalQuestions: number;
  score: number;
  onAnswer: (selectedAnswer: string) => void;
  onBack: () => void;
  showResult?: boolean;
  isCorrect?: boolean;
}

export function GameScreen({
  question,
  gameMode,
  currentQuestionNumber,
  totalQuestions,
  score,
  onAnswer,
  onBack,
  isCorrect = false
}: GameScreenProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    setSelectedAnswer('');
    setShowFeedback(false);
  }, [question]);

  const handleAnswerClick = (answer: string) => {
    if (showFeedback) return;
    
    setSelectedAnswer(answer);
    setShowFeedback(true);
    
    setTimeout(() => {
      onAnswer(answer);
    }, 1500);
  };

  const playAudio = () => {
    // TODO: Implement text-to-speech for Chinese pronunciation
    console.log('Playing audio for:', question.word.pinyin);
  };

  const getQuestionDisplay = () => {
    switch (gameMode) {
      case 'chinese-to-meaning':
        return (
          <div className="text-center">
            <div className="text-6xl md:text-8xl font-bold text-gray-800 mb-4">
              {question.word.chinese}
            </div>
            <div className="text-xl text-gray-600 mb-2">{question.word.pinyin}</div>
          </div>
        );
      case 'meaning-to-chinese':
        return (
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
              "{question.word.meaning}"
            </div>
          </div>
        );
      case 'pinyin-to-chinese':
        return (
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
              {question.word.pinyin}
            </div>            <button
              onClick={playAudio}
              className="flex items-center justify-center mx-auto mb-4 p-3 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors"
              aria-label="Play pronunciation audio"
            >
              <Volume2 className="w-6 h-6 text-blue-600" />
            </button>
          </div>
        );
      case 'chinese-to-pinyin':
        return (
          <div className="text-center">
            <div className="text-6xl md:text-8xl font-bold text-gray-800 mb-4">
              {question.word.chinese}
            </div>
            <div className="text-xl text-gray-600 mb-2">{question.word.meaning}</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              Question {currentQuestionNumber} of {totalQuestions}
            </div>
            <div className="text-sm font-semibold text-blue-600">
              Score: {score}%
            </div>
          </div>
        </div>        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          {/* eslint-disable-next-line react/forbid-dom-props */}
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentQuestionNumber / totalQuestions) * 100}%` }}
          />
        </div>

        {/* Question */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-6 text-center">
            {question.question}
          </h2>
          
          {getQuestionDisplay()}
        </div>

        {/* Answer Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.answers.map((answer, index) => {
            const isSelected = selectedAnswer === answer.text;
            const isCorrectAnswer = answer.isCorrect;
            
            let buttonClass = 'w-full p-6 text-lg font-medium rounded-xl transition-all duration-200 border-2 ';
            
            if (!showFeedback) {
              buttonClass += 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-800';
            } else if (isSelected && isCorrectAnswer) {
              buttonClass += 'bg-green-100 border-green-500 text-green-800';
            } else if (isSelected && !isCorrectAnswer) {
              buttonClass += 'bg-red-100 border-red-500 text-red-800';
            } else if (isCorrectAnswer) {
              buttonClass += 'bg-green-100 border-green-500 text-green-800';
            } else {
              buttonClass += 'bg-gray-100 border-gray-300 text-gray-600';
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerClick(answer.text)}
                disabled={showFeedback}
                className={cn(buttonClass, 'transform hover:scale-105')}
              >
                <div className="flex items-center justify-between">
                  <span>{answer.text}</span>
                  {showFeedback && isSelected && (
                    isCorrectAnswer ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600" />
                    )
                  )}
                  {showFeedback && isCorrectAnswer && !isSelected && (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
            <div className="text-center">
              <div className={cn(
                'text-lg font-semibold mb-2',
                isCorrect ? 'text-green-600' : 'text-red-600'
              )}>
                {isCorrect ? '正确! (Correct!)' : '错误 (Incorrect)'}
              </div>
              <div className="text-gray-600">
                <div className="mb-2">
                  <span className="font-medium">Chinese:</span> {question.word.chinese}
                </div>
                <div className="mb-2">
                  <span className="font-medium">Pinyin:</span> {question.word.pinyin}
                </div>
                <div>
                  <span className="font-medium">Meaning:</span> {question.word.meaning}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
