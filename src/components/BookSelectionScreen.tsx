import { BookOpen, ArrowLeft } from 'lucide-react';
import { cn } from '../lib/utils';

interface BookSelectionScreenProps {
  onSelectBook: (book: 'เล่ม 1' | 'เล่ม 2') => void;
  onBack: () => void;
}

const books = [
  {
    id: 'เล่ม 1' as const,
    title: 'เล่ม 1',
    subtitle: 'Basic Chinese Characters',
    description: 'Fundamental Chinese characters and vocabulary for beginners',
    color: 'bg-blue-500 hover:bg-blue-600',
    stats: '581 words'
  },
  {
    id: 'เล่ม 2' as const,
    title: 'เล่ม 2',
    subtitle: 'Intermediate Chinese',
    description: 'Expanded vocabulary and more complex characters',
    color: 'bg-green-500 hover:bg-green-600',
    stats: '640 words'
  }
];

export function BookSelectionScreen({ onSelectBook, onBack }: BookSelectionScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <button
            onClick={onBack}
            className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Choose Your Book
          </h1>
          <p className="text-lg text-gray-600 mb-2">Select a volume to practice with</p>
          <p className="text-gray-500">Each book contains different levels of vocabulary</p>
        </div>

        {/* Book Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {books.map((book) => (
            <button
              key={book.id}
              onClick={() => onSelectBook(book.id)}
              className={cn(
                'p-8 rounded-xl text-white transition-all duration-200 transform hover:scale-105 shadow-lg',
                book.color
              )}
            >
              <div className="flex items-center justify-center mb-4">
                <BookOpen className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{book.title}</h3>
              <h4 className="text-lg font-medium mb-3 opacity-90">{book.subtitle}</h4>
              <p className="text-sm opacity-80 mb-4">{book.description}</p>
              <div className="bg-white/20 rounded-lg py-2 px-4">
                <span className="text-sm font-medium">{book.stats}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Total Stats */}
        <div className="text-center mt-8">
          <div className="bg-white rounded-lg p-4 shadow-md inline-block">
            <p className="text-gray-600 text-sm">
              <span className="font-semibold">Total:</span> 1,221 Chinese words available
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
