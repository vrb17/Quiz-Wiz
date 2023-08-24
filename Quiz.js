import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Quiz() {
  const { topicId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(null);

  useEffect(() => {
    // Fetch questions for the selected topic
    axios.get(`/api/topics/${topicId}/questions`)
      .then(response => {
        setQuestions(response.data);
        setSelectedAnswers(Array(response.data.length).fill(null));
      })
      .catch(error => {
        console.error(error);
      });
  }, [topicId]);

  const handleAnswerSelect = (questionIndex, selectedOption) => {
    setSelectedAnswers(prevAnswers => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[questionIndex] = selectedOption;
      return updatedAnswers;
    });
  };

  const handleQuizSubmit = () => {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctOption) {
        correctAnswers++;
      }
    });

    const percentageScore = (correctAnswers / questions.length) * 100;
    setScore(percentageScore);
  };

  return (
    <div>
      <header>
        <h1>Quiz for Topic {topicId}</h1>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/profile">Profile</a></li>
            {/* Other navigation links */}
          </ul>
        </nav>
      </header>
      <main>
        <h2>Quiz for Topic {topicId}</h2>
        <form>
          {questions.map((question, questionIndex) => (
            <div key={questionIndex}>
              <h3>Question {questionIndex + 1}:</h3>
              <p>{question.text}</p>
              <ul>
                {question.options.map((option, optionIndex) => (
                  <li key={optionIndex}>
                    <label>
                      <input
                        type="radio"
                        name={`question-${questionIndex}`}
                        value={optionIndex}
                        checked={selectedAnswers[questionIndex] === optionIndex}
                        onChange={() => handleAnswerSelect(questionIndex, optionIndex)}
                      />
                      {option}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </form>
        <button onClick={handleQuizSubmit}>Submit Quiz</button>
        {score !== null && <p>Your Score: {score}%</p>}
      </main>
      {/* Other components */}
    </div>
  );
}

export default Quiz;
