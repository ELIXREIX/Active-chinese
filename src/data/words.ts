import type { ChineseWord } from '../types/game';

// Google Sheets configuration
const GOOGLE_SHEETS_API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID;

// Sample data - Fallback when Google Sheets is not available
export const sampleWords: ChineseWord[] = [
  {
    id: '1',
    chinese: '你好',
    pinyin: 'nǐ hǎo',
    meaning: 'hello',
    level: 'beginner',
    category: 'greetings'
  },
  {
    id: '2',
    chinese: '谢谢',
    pinyin: 'xiè xiè',
    meaning: 'thank you',
    level: 'beginner',
    category: 'greetings'
  },
  {
    id: '3',
    chinese: '再见',
    pinyin: 'zài jiàn',
    meaning: 'goodbye',
    level: 'beginner',
    category: 'greetings'
  },
  {
    id: '4',
    chinese: '学习',
    pinyin: 'xué xí',
    meaning: 'to study/learn',
    level: 'beginner',
    category: 'education'
  },
  {
    id: '5',
    chinese: '朋友',
    pinyin: 'péng yǒu',
    meaning: 'friend',
    level: 'beginner',
    category: 'relationships'
  },
  {
    id: '6',
    chinese: '家庭',
    pinyin: 'jiā tíng',
    meaning: 'family',
    level: 'beginner',
    category: 'relationships'
  },
  {
    id: '7',
    chinese: '工作',
    pinyin: 'gōng zuò',
    meaning: 'work/job',
    level: 'intermediate',
    category: 'career'
  },
  {
    id: '8',
    chinese: '时间',
    pinyin: 'shí jiān',
    meaning: 'time',
    level: 'intermediate',
    category: 'time'
  },
  {
    id: '9',
    chinese: '地方',
    pinyin: 'dì fāng',
    meaning: 'place',
    level: 'intermediate',
    category: 'location'
  },
  {
    id: '10',
    chinese: '美丽',
    pinyin: 'měi lì',
    meaning: 'beautiful',
    level: 'intermediate',
    category: 'adjectives'
  },
  // Additional words for testing "All Questions" feature
  {
    id: '11',
    chinese: '吃饭',
    pinyin: 'chī fàn',
    meaning: 'to eat',
    level: 'beginner',
    category: 'food'
  },
  {
    id: '12',
    chinese: '喝水',
    pinyin: 'hē shuǐ',
    meaning: 'to drink water',
    level: 'beginner',
    category: 'food'
  },
  {
    id: '13',
    chinese: '睡觉',
    pinyin: 'shuì jiào',
    meaning: 'to sleep',
    level: 'beginner',
    category: 'daily'
  },
  {
    id: '14',
    chinese: '起床',
    pinyin: 'qǐ chuáng',
    meaning: 'to get up',
    level: 'beginner',
    category: 'daily'
  },
  {
    id: '15',
    chinese: '上班',
    pinyin: 'shàng bān',
    meaning: 'to go to work',
    level: 'intermediate',
    category: 'career'
  },
  {
    id: '16',
    chinese: '下班',
    pinyin: 'xià bān',
    meaning: 'to get off work',
    level: 'intermediate',
    category: 'career'
  },
  {
    id: '17',
    chinese: '买东西',
    pinyin: 'mǎi dōng xi',
    meaning: 'to buy things/shopping',
    level: 'intermediate',
    category: 'shopping'
  },
  {
    id: '18',
    chinese: '看书',
    pinyin: 'kàn shū',
    meaning: 'to read books',
    level: 'beginner',
    category: 'education'
  },
  {
    id: '19',
    chinese: '听音乐',
    pinyin: 'tīng yīn yuè',
    meaning: 'to listen to music',
    level: 'intermediate',
    category: 'entertainment'
  },
  {
    id: '20',
    chinese: '看电影',
    pinyin: 'kàn diàn yǐng',
    meaning: 'to watch movies',
    level: 'intermediate',
    category: 'entertainment'
  },
  {
    id: '21',
    chinese: '运动',
    pinyin: 'yùn dòng',
    meaning: 'exercise/sports',
    level: 'intermediate',
    category: 'health'
  },
  {
    id: '22',
    chinese: '游泳',
    pinyin: 'yóu yǒng',
    meaning: 'to swim',
    level: 'intermediate',
    category: 'sports'
  },
  {
    id: '23',
    chinese: '跑步',
    pinyin: 'pǎo bù',
    meaning: 'to run/jogging',
    level: 'intermediate',
    category: 'sports'
  },
  {
    id: '24',
    chinese: '开车',
    pinyin: 'kāi chē',
    meaning: 'to drive',
    level: 'intermediate',
    category: 'transportation'
  },
  {
    id: '25',
    chinese: '坐车',
    pinyin: 'zuò chē',
    meaning: 'to take a car/bus',
    level: 'beginner',
    category: 'transportation'
  }
];

// Fetch words from Google Sheets
export async function fetchWordsFromGoogleSheets(): Promise<ChineseWord[]> {
  try {
    if (!GOOGLE_SHEETS_API_KEY || !SHEET_ID) {
      console.warn('Google Sheets API key or Sheet ID not configured, using sample data');
      return sampleWords;
    }

    console.log('🔍 Attempting to fetch data from Google Sheets...');
    console.log('📋 API Key status:', GOOGLE_SHEETS_API_KEY ? '✅ Loaded' : '❌ Missing');
    console.log('📄 Sheet ID:', SHEET_ID);

    // First, check if we can access the sheet metadata
    const metadataUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}?key=${GOOGLE_SHEETS_API_KEY}`;
    console.log('🔗 Testing sheet access:', metadataUrl);
    
    const metadataResponse = await fetch(metadataUrl);
    
    if (!metadataResponse.ok) {
      console.error('❌ Cannot access Google Sheet:', metadataResponse.status, metadataResponse.statusText);
      
      if (metadataResponse.status === 403) {
        console.error('🔒 403 Forbidden Error - The Google Sheet is not publicly accessible');
        console.error('💡 Solution: Go to your Google Sheet → Share → Change to "Anyone with the link can view"');
      } else if (metadataResponse.status === 400) {
        console.error('🔑 400 Bad Request - Check if Google Sheets API is enabled for your API key');
      }
      
      const errorText = await metadataResponse.text();
      console.error('📋 Error details:', errorText);
      console.warn('⚠️ Falling back to sample data...');
      return sampleWords;
    }    const metadata = await metadataResponse.json();
    console.log('✅ Sheet metadata retrieved successfully!');
    console.log('📊 Sheet title:', metadata.properties?.title);
    console.log('📄 Available sheets:', metadata.sheets?.map((s: { properties: { title: string } }) => s.properties.title).join(', '));

    // Try to fetch data from available sheets
    const availableSheets = metadata.sheets?.map((s: { properties: { title: string } }) => s.properties.title) || [];
    const targetSheets = ['เล่ม 1', 'เล่ม 2', 'Sheet1', 'เล่ม1', 'เล่ม2'];
    const sheetsToFetch = targetSheets.filter(sheet => availableSheets.includes(sheet));
    
    if (sheetsToFetch.length === 0) {
      console.warn('⚠️ No matching sheets found. Available sheets:', availableSheets);
      console.warn('🔍 Trying first available sheet...');
      if (availableSheets.length > 0) {
        sheetsToFetch.push(availableSheets[0]);
      }
    }

    console.log('📋 Fetching data from sheets:', sheetsToFetch);

    // Fetch data from identified sheets
    const sheetPromises = sheetsToFetch.map(sheetName => fetchSheetData(sheetName));
    const sheetResults = await Promise.all(sheetPromises);
    
    // Combine data from all sheets
    const allWords = sheetResults.flat();
    
    console.log(`✅ Successfully loaded ${allWords.length} words from Google Sheets`);
    return allWords.length > 0 ? allWords : sampleWords;
  } catch (error) {
    console.error('❌ Error fetching from Google Sheets:', error);
    console.warn('⚠️ Falling back to sample data...');
    // Fallback to sample data if Google Sheets fails
    return sampleWords;
  }
}

async function fetchSheetData(sheetName: string): Promise<ChineseWord[]> {
  try {
    const range = `${sheetName}!A1:D`; // Include header row for debugging
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(range)}?key=${GOOGLE_SHEETS_API_KEY}`;
    
    console.log(`🔍 Fetching data from "${sheetName}"...`);
    console.log(`📡 URL: ${url}`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`❌ Failed to fetch "${sheetName}": ${response.status} ${response.statusText}`);
      
      if (response.status === 403) {
        console.error('🔒 403 Forbidden - Sheet is not publicly accessible');
      } else if (response.status === 400) {
        console.error('❌ 400 Bad Request - Invalid sheet name or range');
      }
      
      const errorText = await response.text();
      console.error('📋 Error details:', errorText);
      return [];
    }
    
    const data = await response.json();
    
    if (!data.values || data.values.length === 0) {
      console.warn(`⚠️ No data found in sheet: "${sheetName}"`);
      return [];
    }
    
    console.log(`📊 Raw data from "${sheetName}": ${data.values.length} rows`);
    console.log(`📋 Header row:`, data.values[0]);
    console.log(`📝 Sample data rows:`, data.values.slice(1, 4));
    
    // Skip header row (index 0)
    const dataRows = data.values.slice(1);
    
    const mappedWords = dataRows.map((row: string[], index: number) => {
      const word = {
        id: `${sheetName}_${index + 1}`,
        chinese: row[1] || '', // Column B
        pinyin: row[2] || '',  // Column C
        meaning: row[3] || '', // Column D (Thai meaning)
        level: 'beginner' as const, // Default level
        category: sheetName === 'เล่ม 1' ? 'book1' : 'book2' // Category based on sheet
      };
      
      // Debug first few words
      if (index < 3) {
        console.log(`🔤 Word ${index + 1}:`, word);
        console.log(`📄 Raw row:`, row);
      }
      
      return word;
    });
    
    // Filter out empty rows
    const filteredWords = mappedWords.filter((word: ChineseWord) => word.chinese && word.pinyin && word.meaning);
    
    console.log(`✅ "${sheetName}": ${mappedWords.length} total rows → ${filteredWords.length} valid words after filtering`);
    
    if (filteredWords.length === 0 && mappedWords.length > 0) {
      console.warn(`⚠️ All rows were filtered out! Check data format:`);
      console.log(`📊 Sample filtered word:`, mappedWords[0]);
    }
    
    return filteredWords;
  } catch (error) {
    console.error(`❌ Error fetching sheet "${sheetName}":`, error);
    return [];
  }
}

// Fetch words from specific book
export async function fetchWordsFromBook(bookName: 'เล่ม 1' | 'เล่ม 2'): Promise<ChineseWord[]> {
  try {
    if (!GOOGLE_SHEETS_API_KEY || !SHEET_ID) {
      console.warn('Google Sheets API key or Sheet ID not configured, using sample data');
      return sampleWords;
    }

    console.log(`🔍 Attempting to fetch data from book: ${bookName}...`);
    console.log('📋 API Key status:', GOOGLE_SHEETS_API_KEY ? '✅ Loaded' : '❌ Missing');
    console.log('📄 Sheet ID:', SHEET_ID);

    // First, check if we can access the sheet metadata
    const metadataUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}?key=${GOOGLE_SHEETS_API_KEY}`;
    console.log('🔗 Testing sheet access:', metadataUrl);
    
    const metadataResponse = await fetch(metadataUrl);
    
    if (!metadataResponse.ok) {
      console.error('❌ Cannot access Google Sheet:', metadataResponse.status, metadataResponse.statusText);
      
      if (metadataResponse.status === 403) {
        console.error('🔒 403 Forbidden Error - The Google Sheet is not publicly accessible');
        console.error('💡 Solution: Go to your Google Sheet → Share → Change to "Anyone with the link can view"');
      } else if (metadataResponse.status === 400) {
        console.error('🔑 400 Bad Request - Check if Google Sheets API is enabled for your API key');
      }
      
      const errorText = await metadataResponse.text();
      console.error('📋 Error details:', errorText);
      console.warn('⚠️ Falling back to sample data...');
      return sampleWords;
    }

    const metadata = await metadataResponse.json();
    console.log('✅ Sheet metadata retrieved successfully!');
    console.log('📊 Sheet title:', metadata.properties?.title);
    console.log('📄 Available sheets:', metadata.sheets?.map((s: { properties: { title: string } }) => s.properties.title).join(', '));

    // Check if the requested book exists
    const availableSheets = metadata.sheets?.map((s: { properties: { title: string } }) => s.properties.title) || [];
    
    if (!availableSheets.includes(bookName)) {
      console.error(`❌ Book "${bookName}" not found. Available sheets:`, availableSheets);
      console.warn('⚠️ Falling back to sample data...');
      return sampleWords;
    }

    console.log(`📋 Fetching data from book: ${bookName}`);

    // Fetch data from the specific book
    const bookWords = await fetchSheetData(bookName);
    
    console.log(`✅ Successfully loaded ${bookWords.length} words from "${bookName}"`);
    return bookWords.length > 0 ? bookWords : sampleWords;
  } catch (error) {
    console.error('❌ Error fetching from Google Sheets:', error);
    console.warn('⚠️ Falling back to sample data...');
    // Fallback to sample data if Google Sheets fails
    return sampleWords;
  }
}

// Utility functions for word management
export function getWordsByLevel(words: ChineseWord[], level: ChineseWord['level']): ChineseWord[] {
  return words.filter(word => word.level === level);
}

export function getWordsByCategory(words: ChineseWord[], category: string): ChineseWord[] {
  return words.filter(word => word.category === category);
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
