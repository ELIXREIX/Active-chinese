import { ChevronLeft, Users, BookOpen, Infinity as InfinityIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface QuestionCountSelectionProps {
  bookName: 'เล่ม 1' | 'เล่ม 2';
  totalWords: number;
  onSelectCount: (count: number | 'all') => void;
  onBack: () => void;
}

const questionOptions: { value: number | 'all'; label: string; icon: React.ReactNode; color: string }[] = [
  { value: 10, label: '10 Questions', icon: <BookOpen className="w-5 h-5" />, color: 'bg-blue-500 hover:bg-blue-600' },
  { value: 25, label: '25 Questions', icon: <BookOpen className="w-5 h-5" />, color: 'bg-green-500 hover:bg-green-600' },
  { value: 50, label: '50 Questions', icon: <BookOpen className="w-5 h-5" />, color: 'bg-purple-500 hover:bg-purple-600' },
  { value: 'all', label: 'All Questions', icon: <InfinityIcon className="w-5 h-5" />, color: 'bg-orange-500 hover:bg-orange-600' }
];

export function QuestionCountSelection({ 
  bookName, 
  totalWords, 
  onSelectCount, 
  onBack 
}: QuestionCountSelectionProps) {
  
  // Debug logging
  console.log('QuestionCountSelection Debug:', {
    bookName,
    totalWords,
    environment: import.meta.env.MODE,
    hasApiKey: !!import.meta.env.VITE_GOOGLE_SHEETS_API_KEY,
    hasSheetId: !!import.meta.env.VITE_GOOGLE_SHEET_ID
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            How many questions?
          </h1>
          <p className="text-xl text-gray-600 mb-2">Choose your practice length</p>
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
            <Users className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-gray-700">
              {bookName} - {totalWords} words available
            </span>
          </div>
        </div>        {/* Question Count Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {questionOptions.map((option) => {
            const isFullyAvailable = option.value === 'all' || (typeof option.value === 'number' && option.value <= totalWords);
            const isPartiallyAvailable = typeof option.value === 'number' && option.value > totalWords && totalWords > 0;
            const isAvailable = isFullyAvailable || isPartiallyAvailable;
            
            let displayLabel = option.label;
            if (option.value === 'all') {
              displayLabel = `All ${totalWords} Questions`;
            } else if (isPartiallyAvailable) {
              displayLabel = `${totalWords} Questions (Max Available)`;
            }
            
            return (
              <button
                key={option.value}
                onClick={() => isAvailable && onSelectCount(isPartiallyAvailable ? totalWords : option.value)}
                disabled={!isAvailable}
                className={cn(
                  'p-6 rounded-xl text-white transition-all duration-200 transform shadow-lg',
                  isAvailable 
                    ? `${option.color} hover:scale-105 cursor-pointer`
                    : 'bg-gray-300 cursor-not-allowed opacity-50'
                )}
              >
                <div className="flex items-center justify-center mb-3">
                  {option.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{displayLabel}</h3>
                <p className="text-sm opacity-90">
                  {option.value === 'all' 
                    ? `Practice all ${totalWords} available words`
                    : isFullyAvailable 
                      ? 'Perfect for quick practice'
                      : isPartiallyAvailable
                        ? `Will use all ${totalWords} available words`
                        : `Only ${totalWords} words available`
                  }
                </p>
                {option.value === 'all' && (
                  <div className="mt-2 text-xs bg-white bg-opacity-20 rounded-full px-3 py-1 inline-block">
                    Recommended for mastery
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Info */}
        <div className="text-center">
          <div className="bg-white rounded-lg p-4 shadow-md inline-block">
            <p className="text-gray-600 text-sm">
              💡 <span className="font-semibold">Tip:</span> Start with 10-25 questions for daily practice, 
              or choose "All Questions" for comprehensive learning sessions.
            </p>
            {totalWords < 50 && (
              <p className="text-amber-600 text-xs mt-2">
                ⚠️ Some options may use fewer questions based on available data. 
                {!import.meta.env.VITE_GOOGLE_SHEETS_API_KEY && (
                  <span> Connect to Google Sheets for full word library.</span>
                )}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
