import { useState, useEffect, useCallback } from 'react';
import type { ChineseWord, GameMode, Question, GameStats } from '../types/game';
import { GameService } from '../services/gameService';
import { fetchWordsFromGoogleSheets, fetchWordsFromBook, shuffleArray } from '../data/words';

export function useGameState() {
  const [words, setWords] = useState<ChineseWord[]>([]);
  const [currentGame, setCurrentGame] = useState<{
    words: ChineseWord[];
    currentIndex: number;
    score: number;
    correctAnswers: number;
    mode: GameMode;
    startTime: Date;
  } | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [gameService] = useState(new GameService());
  const [stats, setStats] = useState<GameStats>({
    totalGamesPlayed: 0,
    totalWordsLearned: 0,
    averageScore: 0,
    streak: 0,    lastPlayedDate: new Date()
  });
  const loadWords = useCallback(async () => {
    try {
      setIsLoading(true);
      const wordsData = await fetchWordsFromGoogleSheets();
      setWords(wordsData);
      gameService.setWords(wordsData);
    } catch (error) {
      console.error('Failed to load words:', error);
    } finally {
      setIsLoading(false);
    }
  }, [gameService]);

  const loadStats = () => {
    const savedStats = localStorage.getItem('chineseWordGameStats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  };
  // Load words on component mount
  useEffect(() => {
    const initializeData = async () => {
      await loadWords();
      loadStats();
    };
    initializeData();
  }, [loadWords]);

  const saveStats = (newStats: GameStats) => {
    localStorage.setItem('chineseWordGameStats', JSON.stringify(newStats));
    setStats(newStats);
  };

  const startGame = (mode: GameMode, wordCount: number = 10) => {
    if (words.length === 0) return;

    const gameWords = shuffleArray(words).slice(0, Math.min(wordCount, words.length));
    const game = {
      words: gameWords,
      currentIndex: 0,
      score: 0,
      correctAnswers: 0,
      mode,
      startTime: new Date()
    };

    setCurrentGame(game);
    generateNextQuestion(game);
  };

  const startGameWithBook = async (mode: GameMode, bookName: 'เล่ม 1' | 'เล่ม 2') => {
    try {
      setIsLoading(true);
      const bookWords = await fetchWordsFromBook(bookName);
      
      if (bookWords.length === 0) {
        console.error('No words loaded from book:', bookName);
        setIsLoading(false);
        return;
      }

      // Use all words from the selected book instead of limiting to 10
      const gameWords = shuffleArray(bookWords);
      const game = {
        words: gameWords,
        currentIndex: 0,
        score: 0,
        correctAnswers: 0,
        mode,
        startTime: new Date()
      };

      setCurrentGame(game);
      gameService.setWords(bookWords);
      generateNextQuestion(game);
    } catch (error) {
      console.error('Failed to start game with book:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateNextQuestion = (game: typeof currentGame) => {
    if (!game || game.currentIndex >= game.words.length) return;

    const currentWord = game.words[game.currentIndex];
    const question = gameService.generateQuestion(currentWord, game.mode, words);
    setCurrentQuestion(question);
  };

  const answerQuestion = (selectedAnswer: string) => {
    if (!currentGame || !currentQuestion) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const newCorrectAnswers = currentGame.correctAnswers + (isCorrect ? 1 : 0);
    const newIndex = currentGame.currentIndex + 1;
    const newScore = gameService.calculateScore(newCorrectAnswers, newIndex);

    const updatedGame = {
      ...currentGame,
      currentIndex: newIndex,
      correctAnswers: newCorrectAnswers,
      score: newScore
    };

    setCurrentGame(updatedGame);

    if (newIndex >= currentGame.words.length) {
      // Game finished
      finishGame(updatedGame);
    } else {
      // Continue to next question
      setTimeout(() => {
        generateNextQuestion(updatedGame);
      }, 100);
    }

    return isCorrect;
  };
  const finishGame = (game: typeof currentGame) => {
    if (!game) return;

    // Note: timeElapsed could be used for future features like time-based scoring
    // const timeElapsed = Math.floor((new Date().getTime() - game.startTime.getTime()) / 1000);
    
    // Update stats
    const newStats: GameStats = {
      totalGamesPlayed: stats.totalGamesPlayed + 1,
      totalWordsLearned: stats.totalWordsLearned + game.words.length,
      averageScore: (stats.averageScore * stats.totalGamesPlayed + game.score) / (stats.totalGamesPlayed + 1),
      streak: isConsecutiveDay() ? stats.streak + 1 : 1,
      lastPlayedDate: new Date()
    };

    saveStats(newStats);
  };

  const isConsecutiveDay = (): boolean => {
    const today = new Date();
    const lastPlayed = new Date(stats.lastPlayedDate);
    const diffTime = Math.abs(today.getTime() - lastPlayed.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 1;
  };

  const resetGame = () => {
    setCurrentGame(null);
    setCurrentQuestion(null);
  };

  return {
    words,
    currentGame,
    currentQuestion,
    stats,
    isLoading,
    startGame,
    startGameWithBook,
    answerQuestion,
    resetGame,
    loadWords
  };
}
