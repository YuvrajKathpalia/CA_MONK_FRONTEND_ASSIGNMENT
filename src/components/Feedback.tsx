import React from 'react';
import { Question, UserAnswer } from '../types';
import { Button } from './ui/Button';

interface FeedbackProps {
  questions: Question[];
  userAnswers: UserAnswer[];
  onRestart: () => void;
}

const Feedback: React.FC<FeedbackProps> = ({ questions, userAnswers, onRestart }) => {
  const score = userAnswers.filter(answer => answer.isCorrect).length;
  
  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Your Results</h2>
      
      <div className="text-center mb-8">
        <p className="text-lg">
          You scored <span className="font-bold text-xl">{score}</span> out of <span className="font-bold">{questions.length}</span>
        </p>
      </div>
      
      <div className="space-y-6">
        {userAnswers.map((answer, index) => {
          const question = questions.find(q => q.questionId === answer.questionId);
          if (!question) return null;
          
          const parts = question.question.split(/[_]+/);
          
          return (
            <div 
              key={index} 
              className={`p-4 rounded-md ${answer.isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}
            >
              <p className="font-semibold mb-2">
                Question {index + 1}: {answer.isCorrect ? '✓ Correct' : '✗ Incorrect'}
              </p>
              
              <div className="mb-2">
                <p className="font-medium">Your answer:</p>
                <p>
                  {parts.map((part, i) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < parts.length - 1 && (
                        <span className={`inline-block px-1 font-medium ${
                          answer.answers[i] === question.correctAnswer[i] ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {answer.answers[i] || '(empty)'}
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </p>
              </div>
              
              {!answer.isCorrect && (
                <div>
                  <p className="font-medium">Correct answer:</p>
                  <p>
                    {parts.map((part, i) => (
                      <React.Fragment key={i}>
                        {part}
                        {i < parts.length - 1 && (
                          <span className="inline-block px-1 font-medium text-green-600">
                            {question.correctAnswer[i]}
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="mt-8 text-center">
        <Button onClick={onRestart}>
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default Feedback;