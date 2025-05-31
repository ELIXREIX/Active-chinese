export interface ChineseWord {
  id: string;
  chinese: string;
  pinyin: string;
  meaning: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  category?: string;
}

export interface GameSession {
  id: string;
  words: ChineseWord[];
  currentWordIndex: number;
  score: number;
  correctAnswers: number;
  totalAnswers: number;
  gameMode: GameMode;
  startTime: Date;
  endTime?: Date;
}

export type GameMode = 
  | 'chinese-to-meaning'
  | 'meaning-to-chinese'
  | 'pinyin-to-chinese'
  | 'chinese-to-pinyin'
  | 'listening';

export interface GameStats {
  totalGamesPlayed: number;
  totalWordsLearned: number;
  averageScore: number;
  streak: number;
  lastPlayedDate: Date;
}

export interface Answer {
  text: string;
  isCorrect: boolean;
}

export interface Question {
  word: ChineseWord;
  question: string;
  answers: Answer[];
  correctAnswer: string;
}
