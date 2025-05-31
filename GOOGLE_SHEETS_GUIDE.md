# Google Sheets Integration Guide

This guide will help you connect your Chinese vocabulary data from Google Sheets to the learning game.

## Step 1: Prepare Your Google Sheet

Create a Google Sheet with the following column headers in the first row:

| Column A | Column B | Column C | Column D | Column E |
|----------|----------|----------|----------|----------|
| Chinese  | Pinyin   | Meaning  | Level    | Category |

### Example Data:
```
Chinese | Pinyin    | Meaning      | Level        | Category
你好    | nǐ hǎo    | hello        | beginner     | greetings
谢谢    | xiè xiè   | thank you    | beginner     | greetings
学习    | xué xí    | to study     | beginner     | education
朋友    | péng yǒu  | friend       | beginner     | relationships
工作    | gōng zuò  | work/job     | intermediate | career
```

## Step 2: Make Your Sheet Public (Option 1 - Simple)

1. Click "Share" in the top-right corner of your Google Sheet
2. Click "Change to anyone with the link"
3. Set permissions to "Viewer"
4. Copy the share link

## Step 3: Set Up Google Sheets API (Option 2 - Advanced)

### Get API Credentials:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google Sheets API
4. Create credentials (API Key)
5. Add your API key to the project

### Update the Code:
Replace the content in `src/data/words.ts`:

```typescript
const GOOGLE_SHEETS_API_KEY = 'your-api-key-here';
const SHEET_ID = 'your-sheet-id-here';
const RANGE = 'Sheet1!A2:E'; // Adjust range as needed

export async function fetchWordsFromGoogleSheets(): Promise<ChineseWord[]> {
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${GOOGLE_SHEETS_API_KEY}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (!data.values) {
      throw new Error('No data found in sheet');
    }
    
    return data.values.map((row: string[], index: number) => ({
      id: (index + 1).toString(),
      chinese: row[0] || '',
      pinyin: row[1] || '',
      meaning: row[2] || '',
      level: (row[3] as ChineseWord['level']) || 'beginner',
      category: row[4] || 'general'
    }));
  } catch (error) {
    console.error('Error fetching from Google Sheets:', error);
    // Fallback to sample data
    return sampleWords;
  }
}
```

## Step 4: Get Your Sheet ID

From your Google Sheets URL:
`https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit#gid=0`

Copy the `SHEET_ID_HERE` part.

## Step 5: Environment Variables (Recommended)

Create a `.env` file in your project root:

```env
VITE_GOOGLE_SHEETS_API_KEY=your-api-key
VITE_GOOGLE_SHEET_ID=your-sheet-id
```

Then update your code to use:
```typescript
const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID;
```

## Data Format Requirements

### Levels:
- `beginner` - Basic vocabulary
- `intermediate` - Common words
- `advanced` - Complex vocabulary

### Categories (Examples):
- `greetings` - Hello, goodbye, etc.
- `numbers` - One, two, three, etc.
- `colors` - Red, blue, green, etc.
- `food` - Rice, noodles, etc.
- `family` - Mother, father, etc.
- `time` - Today, tomorrow, etc.

## Troubleshooting

### Common Issues:
1. **Sheet not accessible**: Make sure sharing is enabled
2. **API quota exceeded**: Check your Google Cloud Console usage
3. **Data format errors**: Ensure columns match expected format
4. **CORS issues**: API key method should resolve this

### Testing Your Integration:
1. Open browser developer tools
2. Check console for any error messages
3. Verify data is loading in the Network tab
4. Test with a small dataset first

## Security Notes

- Never commit API keys to version control
- Use environment variables for sensitive data
- Consider using OAuth for production applications
- Regularly rotate your API keys

## Alternative: CSV Upload

For a simpler approach, you can also:
1. Export your Google Sheet as CSV
2. Place the CSV file in the `public` folder
3. Fetch it using the browser's fetch API

This eliminates the need for API keys but requires manual updates.
