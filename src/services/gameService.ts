import type { ChineseWord, GameMode, Question, Answer } from '../types/game';
import { shuffleArray } from '../data/words';

export class GameService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setWords(_words: ChineseWord[]) {
    // Words are passed directly to generateQuestion, so no need to store them
  }

  generateQuestion(word: ChineseWord, gameMode: GameMode, allWords: ChineseWord[]): Question {
    switch (gameMode) {
      case 'chinese-to-meaning':
        return this.generateChineseToMeaning(word, allWords);
      case 'meaning-to-chinese':
        return this.generateMeaningToChinese(word, allWords);
      case 'pinyin-to-chinese':
        return this.generatePinyinToChinese(word, allWords);
      case 'chinese-to-pinyin':
        return this.generateChineseToPinyin(word, allWords);
      default:
        return this.generateChineseToMeaning(word, allWords);
    }
  }
  private generateChineseToMeaning(word: ChineseWord, allWords: ChineseWord[]): Question {
    const wrongAnswers = this.getRandomWrongAnswers(
      allWords.filter(w => w.id !== word.id),
      3
    );
    
    const answers: Answer[] = shuffleArray([
      { text: word.meaning, isCorrect: true },
      ...wrongAnswers.map(w => ({ text: w.meaning, isCorrect: false }))
    ]);

    return {
      word,
      question: `What does "${word.chinese}" mean?`,
      answers,
      correctAnswer: word.meaning
    };
  }
  private generateMeaningToChinese(word: ChineseWord, allWords: ChineseWord[]): Question {
    const wrongAnswers = this.getRandomWrongAnswers(
      allWords.filter(w => w.id !== word.id),
      3
    );
    
    const answers: Answer[] = shuffleArray([
      { text: word.chinese, isCorrect: true },
      ...wrongAnswers.map(w => ({ text: w.chinese, isCorrect: false }))
    ]);

    return {
      word,
      question: `Which character means "${word.meaning}"?`,
      answers,
      correctAnswer: word.chinese
    };
  }
  private generatePinyinToChinese(word: ChineseWord, allWords: ChineseWord[]): Question {
    const wrongAnswers = this.getRandomWrongAnswers(
      allWords.filter(w => w.id !== word.id),
      3
    );
    
    const answers: Answer[] = shuffleArray([
      { text: word.chinese, isCorrect: true },
      ...wrongAnswers.map(w => ({ text: w.chinese, isCorrect: false }))
    ]);

    return {
      word,
      question: `Which character is pronounced "${word.pinyin}"?`,
      answers,
      correctAnswer: word.chinese
    };
  }
  private generateChineseToPinyin(word: ChineseWord, allWords: ChineseWord[]): Question {
    const wrongAnswers = this.getRandomWrongAnswers(
      allWords.filter(w => w.id !== word.id),
      3
    );
    
    const answers: Answer[] = shuffleArray([
      { text: word.pinyin, isCorrect: true },
      ...wrongAnswers.map(w => ({ text: w.pinyin, isCorrect: false }))
    ]);

    return {
      word,
      question: `How do you pronounce "${word.chinese}"?`,
      answers,
      correctAnswer: word.pinyin
    };
  }
  private getRandomWrongAnswers(
    words: ChineseWord[], 
    count: number
  ): ChineseWord[] {
    const shuffled = shuffleArray(words);
    return shuffled.slice(0, count);
  }

  calculateScore(correctAnswers: number, totalAnswers: number): number {
    if (totalAnswers === 0) return 0;
    return Math.round((correctAnswers / totalAnswers) * 100);
  }
}
