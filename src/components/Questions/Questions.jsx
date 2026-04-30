import styles from "./Questions.module.css";
import { useState, useEffect } from "react";

const QuestionsPage = () => {
  const [questionsWithPossibleAnswers, setQuestionsWithPossibleAnswers] =
    useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(
      "https://opentdb.com/api.php?amount=5&category=18&difficulty=medium&type=multiple",
      { signal: controller.signal },
    )
      .then((res) => res.json())
      .then((data) => {
        const processed = data.results.map((result) => ({
          question: result.question,
          allPossibleAnswers: [
            ...result.incorrect_answers,
            result.correct_answer,
          ].sort(() => Math.random() - 0.5),
        }));
        setQuestionsWithPossibleAnswers(processed);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message);
      });
    return () => controller.abort();
  }, []);

  if (error) return <p>Something went wrong: {error}</p>;
  if (loading) return <p>Loading ...</p>;

  const renderAnswers = (allPossibleAnswers, questionIndex) =>
    allPossibleAnswers.map((answer) => (
      <label key={answer}>
        <input type="radio" name={`question${questionIndex}`} value={answer} />
        <span className={styles.singlePossibleAnswer}>{answer}</span>
      </label>
    ));

  const renderQuestions = questionsWithPossibleAnswers.map(
    (question, questionIndex) => (
      <div key={question.question}>
        <h2 className={styles.question}>{question.question}</h2>
        <div className={styles.answers}>
          {renderAnswers(question.allPossibleAnswers, questionIndex)}
        </div>
        <hr className={styles.horizontalLine} />
      </div>
    ),
  );

  return (
    <main className={styles.questionsPageMainContainer}>
      {questionsWithPossibleAnswers && renderQuestions}
      <button type="submit" className={styles.checkAnswersBtn}>
        Check Answers
      </button>
    </main>
  );
};

export default QuestionsPage;
