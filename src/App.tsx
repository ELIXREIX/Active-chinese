import { useState } from 'react';
import type { GameMode } from './types/game';
import { useGameState } from './hooks/useGameState';
import { HomeScreen } from './components/HomeScreen';
import { BookSelectionScreen } from './components/BookSelectionScreen';
import { GameScreen } from './components/GameScreen';
import { GameResults } from './components/GameResults';
import { ProgressScreen } from './components/ProgressScreen';
import { LoadingScreen } from './components/LoadingSpinner';

type AppScreen = 'home' | 'book-selection' | 'game' | 'results' | 'progress';

function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('home');
  const [selectedGameMode, setSelectedGameMode] = useState<GameMode | null>(null);
  const [lastAnswer, setLastAnswer] = useState<{ isCorrect: boolean; selectedAnswer: string } | null>(null);
  
  const {
    words,
    currentGame,
    currentQuestion,
    stats,
    isLoading,
    startGameWithBook,
    answerQuestion,
    resetGame
  } = useGameState();

  const handleStartGame = (mode: GameMode) => {
    setSelectedGameMode(mode);
    setCurrentScreen('book-selection');
  };

  const handleSelectBook = (book: 'เล่ม 1' | 'เล่ม 2') => {
    if (selectedGameMode) {
      startGameWithBook(selectedGameMode, book);
      setCurrentScreen('game');
    }
  };

  const handleAnswer = (selectedAnswer: string) => {
    if (!currentQuestion) return;
    
    const isCorrect = answerQuestion(selectedAnswer) ?? false;
    setLastAnswer({ isCorrect, selectedAnswer });
    
    // Check if game is finished
    if (currentGame && currentGame.currentIndex >= currentGame.words.length - 1) {
      setTimeout(() => {
        setCurrentScreen('results');
      }, 2000);
    }
  };

  const handlePlayAgain = () => {
    if (currentGame) {
      // Go back to book selection to choose again
      setCurrentScreen('book-selection');
    }
  };

  const handleBackToHome = () => {
    resetGame();
    setCurrentScreen('home');
    setLastAnswer(null);
  };

  const handleViewProgress = () => {
    setCurrentScreen('progress');
  };

  if (isLoading) {
    return <LoadingScreen message="Loading Chinese words..." />;
  }

  if (words.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-2xl p-8 shadow-lg max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Words Available</h2>
          <p className="text-gray-600 mb-6">
            Please make sure your Google Sheets contains Chinese word data with the following columns:
            Chinese, Pinyin, and Meaning.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    );
  }

  switch (currentScreen) {
    case 'book-selection':
      return (
        <BookSelectionScreen
          onSelectBook={handleSelectBook}
          onBack={handleBackToHome}
        />
      );

    case 'game':
      if (!currentGame || !currentQuestion) {
        return <LoadingScreen message="Preparing game..." />;
      }
      
      return (
        <GameScreen
          question={currentQuestion}
          gameMode={currentGame.mode}
          currentQuestionNumber={currentGame.currentIndex + 1}
          totalQuestions={currentGame.words.length}
          score={currentGame.score}
          onAnswer={handleAnswer}
          onBack={handleBackToHome}
          showResult={!!lastAnswer}
          isCorrect={lastAnswer?.isCorrect || false}
        />
      );

    case 'results': {
      if (!currentGame) {
        setCurrentScreen('home');
        return null;
      }
      
      const timeElapsed = Math.floor((new Date().getTime() - currentGame.startTime.getTime()) / 1000);
      
      return (
        <GameResults
          score={currentGame.score}
          correctAnswers={currentGame.correctAnswers}
          totalQuestions={currentGame.words.length}
          timeElapsed={timeElapsed}
          onPlayAgain={handlePlayAgain}
          onBackToHome={handleBackToHome}
        />
      );
    }

    case 'progress':
      return (
        <ProgressScreen
          stats={stats}
          onBack={handleBackToHome}
        />
      );

    default:
      return (
        <HomeScreen
          onStartGame={handleStartGame}
          onViewProgress={handleViewProgress}
        />
      );
  }
}

export default App;
