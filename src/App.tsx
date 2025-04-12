import React, { useEffect, useState } from 'react';
import { Question as QuestionType, QuestionResponse, UserAnswer } from './types';
import Question from './components/Question';
import Feedback from './components/Feedback';

function App() {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
   
    fetch('http://localhost:3001/questions')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        return response.json();
      })
      .then((data: QuestionResponse) => {
        if (data.status === 'SUCCESS' && data.data.questions) {
          setQuestions(data.data.questions);
        } else {
          throw new Error('Invalid data format');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching questions:', err);
        setError('Failed to load questions. Please try again later.');
        setLoading(false);
      });
  }, []);

  const handleQuestionComplete = (answers: string[]) => {
    const currentQuestion = questions[currentQuestionIndex];
    
    // Check if answers are correct (exact match with correctAnswer array)
    const isCorrect = answers.every((answer, index) => 
      answer === currentQuestion.correctAnswer[index]
    );
    
    // Save user's answer
    const userAnswer: UserAnswer = {
      questionId: currentQuestion.questionId,
      answers,
      isCorrect
    };
    
    setUserAnswers(prev => [...prev, userAnswer]);
    
    // Move to next question or show results
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setQuizCompleted(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading quiz questions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10">Sentence Construction Tool</h1>
        
        {quizCompleted ? (
          <Feedback 
            questions={questions} 
            userAnswers={userAnswers} 
            onRestart={handleRestart} 
          />
        ) : questions.length > 0 ? (
          <Question 
            question={questions[currentQuestionIndex]} 
            onComplete={handleQuestionComplete}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
          />
        ) : (
          <div className="text-center">No questions available</div>
        )}
      </div>
    </div>
  );
}

export default App;