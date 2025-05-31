# 汉语学习 (Chinese Word Learning Game)

<!-- Updated with GitHub secrets configuration -->

A React TypeScript application for learning Chinese vocabulary with interactive games similar to Duolingo.

![Chinese Learning Game](https://img.shields.io/badge/Language-Chinese-red) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)

## ✨ Features

- **Multiple Game Modes**: Practice Chinese characters, pinyin, and meanings
  - Chinese → Meaning
  - Meaning → Chinese  
  - Pinyin → Chinese
  - Chinese → Pinyin

- **Google Sheets Integration**: Import your vocabulary data directly from Google Sheets
- **Progress Tracking**: Monitor your learning progress with detailed statistics
- **Achievement System**: Unlock achievements as you improve
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Modern UI**: Beautiful, Duolingo-inspired interface

## 🚀 Quick Start

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd chinese-word
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📊 Google Sheets Setup

To use your own vocabulary data:

1. Create a Google Sheet with the following columns:
   - **Chinese**: Chinese characters (e.g., 你好)
   - **Pinyin**: Pronunciation (e.g., nǐ hǎo)
   - **Meaning**: English translation (e.g., hello)
   - **Level**: difficulty level (beginner/intermediate/advanced)
   - **Category**: word category (optional)

2. Share your Google Sheet publicly or set up API access
3. Update the Google Sheets integration in `src/data/words.ts`

### Example Sheet Format:
| Chinese | Pinyin | Meaning | Level | Category |
|---------|--------|---------|-------|----------|
| 你好 | nǐ hǎo | hello | beginner | greetings |
| 谢谢 | xiè xiè | thank you | beginner | greetings |
| 学习 | xué xí | to study | beginner | education |

## 🎮 How to Play

1. **Choose a Game Mode**: Select from four different learning modes
2. **Answer Questions**: Choose the correct answer from multiple choices
3. **Track Progress**: View your statistics and achievements
4. **Practice Regularly**: Build a learning streak for better retention

## 🛠 Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Data Storage**: LocalStorage

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── HomeScreen.tsx   # Main menu
│   ├── GameScreen.tsx   # Game interface
│   ├── GameResults.tsx  # Results screen
│   └── ProgressScreen.tsx # Statistics view
├── types/               # TypeScript type definitions
├── data/                # Data management
├── services/            # Game logic
├── hooks/               # Custom React hooks
└── lib/                 # Utility functions
```

## 🚧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Future Enhancements

- [ ] Audio pronunciation support
- [ ] Spaced repetition algorithm
- [ ] Multiplayer challenges
- [ ] Offline mode
- [ ] More game modes (typing, listening)
- [ ] Export progress data

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by Duolingo's gamification approach
- Chinese vocabulary data structure follows HSK standards
- UI design influenced by modern language learning apps

---

Made with ❤️ for Chinese language learners

