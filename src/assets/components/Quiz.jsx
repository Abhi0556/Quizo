import React, { useState } from 'react';
import quizData from '../../Data/quizData';
import Timer from './Timer';

const Quiz = ({ logout }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(
    Array(quizData.length).fill(null)
  );
  const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showRules, setShowRules] = useState(true); // State to show rules
  const [score, setScore] = useState(0);

  const handleOptionSelect = (option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[currentQuestion] = option;
    setSelectedOptions(updatedOptions);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1)
      setCurrentQuestion(currentQuestion + 1);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    selectedOptions.forEach((option, index) => {
      if (option === quizData[index].answer) calculatedScore += 1;
    });
    setScore(calculatedScore);
    setIsSubmitted(true);
  };

  const handleRetest = () => {
    setSelectedOptions(Array(quizData.length).fill(null));
    setCurrentQuestion(0);
    setTimer(600); // Reset timer
    setIsSubmitted(false);
    setScore(0);
    setShowRules(true); // Show rules again for retest
  };

  // Function to start the quiz after showing rules
  const handleStartQuiz = () => {
    setShowRules(false); // Hide rules and start the quiz
  };

  // Display result box after quiz submission
  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="p-6 bg-white rounded shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
          <p className="text-lg mb-4">
            Your score: <span className="font-bold">{score}</span>/{quizData.length}
          </p>
          {score >= 10 ? (
            <p className="text-green-500 font-bold mb-4">Congratulations! You passed the test!</p>
          ) : (
            <p className="text-red-500 font-bold mb-4">Sorry, try harder next time.</p>
          )}
          <button
            onClick={handleRetest}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-4"
          >
            Retest
          </button>
          <button
            onClick={logout}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  // Display rules if showRules is true
  if (showRules) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h2 className="text-3xl font-bold mb-4">Quiz Instructions</h2>
        <ul className="text-lg mb-6 list-disc px-8">
          <li>Each question has 4 options, select one option for each question.</li>
          <li>Once you submit, you cannot go back and change your answers.</li>
          <li>The quiz is timed. You have 10 minutes to complete the quiz.</li>
          <li>The timer will be visible at the bottom right corner of the page.</li>
          <li>Make sure to submit the quiz before the timer runs out.</li>
        </ul>
        <button
          onClick={handleStartQuiz}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          I Understand, Start the Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-100 p-4">
      {/* Header Section */}
      <div className="flex justify-between items-center w-full mb-4 p-4">
        <div className="flex items-center">
          <img
            src="../../../src/logo.jpg" // Placeholder for logo
            alt="Quizo Logo"
            className="w-10 h-10 mr-2"
          />
          <h1 className="text-xl font-bold">Quizo</h1>
        </div>
        <button
          onClick={logout}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Quiz Section */}
      <div className="flex flex-col items-center justify-center w-full mb-44">
        <h2 className="text-2xl font-bold mb-4">Quiz</h2>
        <p className="text-lg text-center mb-2">
          Question {currentQuestion + 1} of {quizData.length}
        </p>
        <p className="mt-2 text-lg text-center mb-6">{quizData[currentQuestion].question}</p>

        <div className="grid grid-cols-2 gap-4 mb-4 w-full max-w-xl">
          {quizData[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(option)}
              className={`flex justify-center items-center p-2 border rounded w-full min-w-[120px] ${
                selectedOptions[currentQuestion] === option
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200'
              } hover:bg-blue-400 hover:text-white`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="flex justify-center mt-4 gap-64">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`px-4 py-2 rounded ${
              currentQuestion === 0
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            Previous
          </button>
          {currentQuestion < quizData.length - 1 ? (
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Submit
            </button>
          )}
        </div>
      </div>

      <div className="absolute bottom-[6vw] right-10 text-black font-bold ">
        <Timer timer={timer} setTimer={setTimer} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default Quiz;
