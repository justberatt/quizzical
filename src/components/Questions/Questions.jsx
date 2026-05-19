import styles from "./Questions.module.css";
import { useState, useEffect } from "react";
import { decode } from "html-entities";

const QuestionsPage = () => {
  const [questionsWithPossibleAnswers, setQuestionsWithPossibleAnswers] =
    useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [gameKey, setGameKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(
      "https://opentdb.com/api.php?amount=7&category=18&difficulty=medium&type=multiple",
      { signal: controller.signal },
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data) throw new Error("No data received");
        const processed = data.results.map((result) => ({
          question: decode(result.question),
          correctAnswer: decode(result.correct_answer),
          allPossibleAnswers: [
            ...result.incorrect_answers,
            result.correct_answer,
          ]
            .map((answer) => decode(answer))
            .sort(() => Math.random() - 0.5),
        }));

        setQuestionsWithPossibleAnswers(processed);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message);
      });
    return () => controller.abort();
  }, [gameKey]);

  if (error) return <p>Something went wrong: {error}</p>;
  if (loading) return <p>Loading ...</p>;

  const selectAnswer = (answer, questionIndex) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: answer }));
  };

  const getAnswerClass = (answer, questionIndex, correctAnswer) => {
    const isSelected = selectedAnswers[questionIndex] === answer;
    if (score === null) {
      return isSelected ? styles.selectedAnswer : "";
    }
    if (answer === correctAnswer)
      return selectedAnswers[questionIndex] !== undefined
        ? styles.correctAnswer
        : styles.missedAnswer;
    if (isSelected) return styles.incorrectAnswer;
    return styles.dimmedAnswer;
  };

  const renderAnswers = (allPossibleAnswers, questionIndex, correctAnswer) =>
    allPossibleAnswers.map((answer) => (
      <label key={answer}>
        <input
          type="radio"
          name={`question${questionIndex}`}
          value={answer}
          onChange={() => selectAnswer(answer, questionIndex)}
          disabled={score !== null && selectedAnswers[questionIndex] !== answer}
        />
        <span
          className={`${styles.singlePossibleAnswer} ${getAnswerClass(answer, questionIndex, correctAnswer)}`}
        >
          {answer}
        </span>
      </label>
    ));

  const renderQuestions = questionsWithPossibleAnswers.map(
    (question, questionIndex) => (
      <div key={question.question}>
        <h2 className={styles.question}>{question.question}</h2>
        <div className={styles.answers}>
          {renderAnswers(
            question.allPossibleAnswers,
            questionIndex,
            question.correctAnswer,
          )}
        </div>
        <hr className={styles.horizontalLine} />
      </div>
    ),
  );

  const tallyAnswers = () => {
    const correct = questionsWithPossibleAnswers.reduce(
      (count, question, index) =>
        selectedAnswers[index] === question.correctAnswer ? count + 1 : count,
      0,
    );
    setScore(correct);
  };

  const resetGame = () => {
    setSelectedAnswers({});
    setScore(null);
    setLoading(true);
    setError(null);
    setGameKey((prev) => prev + 1);
  };

  return (
    <main className={styles.questionsPageMainContainer}>
      {questionsWithPossibleAnswers && renderQuestions}
      {score !== null ? (
        <div className={styles.scoreRow}>
          <p className={styles.scoreMessage}>
            You scored {score}/{questionsWithPossibleAnswers.length} correct
            answers
          </p>
          <button
            type="button"
            className={styles.checkAnswersBtn}
            onClick={resetGame}
          >
            Play Again
          </button>
        </div>
      ) : (
        <button
          type="button"
          className={styles.checkAnswersBtn}
          onClick={tallyAnswers}
        >
          Check Answers
        </button>
      )}
    </main>
  );
};

export default QuestionsPage;
