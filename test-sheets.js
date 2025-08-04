// Test Google Sheets API connection
console.log('Starting Google Sheets API test...');

const API_KEY = 'AIzaSyATDXsSLhZ5u0AaHNaDYpHpk_MoxlSmtZo';
const SHEET_ID = '1REVTJHA3opjk-sJol24Q98cRjiB99o3orZK5leb6kdQ';

async function testGoogleSheets() {
  try {
    console.log('Testing Google Sheets API...');
    console.log('API Key:', API_KEY ? 'Configured' : 'Missing');
    console.log('Sheet ID:', SHEET_ID ? 'Configured' : 'Missing');
    
    // Test Book 1
    const book1Url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/เล่ม 1!A2:D?key=${API_KEY}`;
    console.log('Testing Book 1 URL:', book1Url);
    
    const response = await fetch(book1Url);
    console.log('Response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('Book 1 data:', data);
      console.log('Number of words in Book 1:', data.values ? data.values.length : 0);
    } else {
      const errorText = await response.text();
      console.error('Error response:', errorText);
    }
    
    // Test Book 2
    const book2Url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/เล่ม 2!A2:D?key=${API_KEY}`;
    console.log('Testing Book 2 URL:', book2Url);
    
    const response2 = await fetch(book2Url);
    console.log('Book 2 Response status:', response2.status);
    
    if (response2.ok) {
      const data2 = await response2.json();
      console.log('Book 2 data:', data2);
      console.log('Number of words in Book 2:', data2.values ? data2.values.length : 0);
    } else {
      const errorText2 = await response2.text();
      console.error('Book 2 Error response:', errorText2);
    }
    
  } catch (error) {
    console.error('Error testing Google Sheets:', error);
  }
}

testGoogleSheets();
