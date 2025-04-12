import React, { useEffect, useState } from 'react';
import { Question as QuestionType } from '../types';
import Timer from './Timer';
import { Button } from './ui/Button';

interface QuestionProps {
  question: QuestionType;
  onComplete: (answers: string[]) => void;
  questionNumber: number;
  totalQuestions: number;
}

const Question: React.FC<QuestionProps> = ({ question, onComplete, questionNumber, totalQuestions }) => {
  
  if (!question) {
    return <div>Loading question...</div>;
  }

  // Count blanks in the question
  const blankCount = (question.question.match(/[_]+/g) || []).length;
  
  const [selectedWords, setSelectedWords] = useState<(string | null)[]>(Array(blankCount).fill(null));
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  
  useEffect(() => {
    setSelectedWords(Array(blankCount).fill(null));
    setAvailableWords([...question.options]);
  }, [question, blankCount]);

  const handleSelectWord = (word: string) => {
    const firstEmptyIndex = selectedWords.findIndex(w => w === null);
    if (firstEmptyIndex !== -1) {
      const newSelectedWords = [...selectedWords];
      newSelectedWords[firstEmptyIndex] = word;
      setSelectedWords(newSelectedWords);
      setAvailableWords(availableWords.filter(w => w !== word));
    }
  };

  const handleUnselectWord = (index: number) => {
    const word = selectedWords[index];
    if (word) {
      // Create a new copy of the selected words array
      const newSelectedWords = [...selectedWords];
      // Remove the word at the specified index
      newSelectedWords[index] = null;
      setSelectedWords(newSelectedWords);
      
      // Return the word to the available words list
      setAvailableWords([...availableWords, word]);
    }
  };

  const handleNext = () => {
    onComplete(selectedWords.filter(word => word !== null) as string[]);
  };

  const handleTimeUp = () => {
    onComplete(selectedWords.filter(word => word !== null) as string[]);
  };

  const renderSentenceWithBlanks = () => {
    const parts = question.question.split(/[_]+/);
    let blankIndex = 0;
    
    return (
      <div className="text-xl mb-8 text-center">
        {parts.map((part, i) => (
          <React.Fragment key={i}>
            {part}
            {i < parts.length - 1 && (
              <span
                className={`inline-block min-w-20 mx-1 px-2 py-1 border-b-2 text-center ${
                  selectedWords[blankIndex] ? 'bg-blue-100 border-blue-500 cursor-pointer' : 'border-gray-300'
                }`}
                onClick={() => selectedWords[blankIndex] && handleUnselectWord(blankIndex)}
              >
                {selectedWords[blankIndex] || ''}
              </span>
            )}
            {i < parts.length - 1 && (() => { blankIndex++; return null; })()}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Question {questionNumber}/{totalQuestions}</h2>
      </div>
      
      <Timer seconds={30} onTimeUp={handleTimeUp} isActive={true} key={question.questionId} />
      
      {renderSentenceWithBlanks()}
      
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {availableWords.map((word, index) => (
          <button
            key={index}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            onClick={() => handleSelectWord(word)}
          >
            {word}
          </button>
        ))}
      </div>
      
      <div className="flex justify-end">
        <Button
          onClick={handleNext}
          disabled={selectedWords.some(word => word === null)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Question;