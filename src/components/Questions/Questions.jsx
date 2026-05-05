import styles from "./Questions.module.css";
import { useState, useEffect } from "react";
import { decode } from "html-entities";

const QuestionsPage = () => {
  const [questionsWithPossibleAnswers, setQuestionsWithPossibleAnswers] =
    useState([]);
  // const [selectedAnswers, setSelectedAnswers] = useState([])
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
          correctAnswer: result.correct_answer,
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
  }, []);

  if (error) return <p>Something went wrong: {error}</p>;
  if (loading) return <p>Loading ...</p>;

  const renderAnswers = (allPossibleAnswers, questionIndex) =>
    allPossibleAnswers.map((answer) => (
      <label key={answer}>
        <input
          type="radio"
          name={`question${questionIndex}`}
          value={answer}
          // onChange={}
        />
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

  const tallyAnswers = () => {
    // I will add the code to tally answers here
  };

  return (
    <main className={styles.questionsPageMainContainer}>
      {questionsWithPossibleAnswers && renderQuestions}
      <button
        type="button"
        className={styles.checkAnswersBtn}
        onClick={tallyAnswers}
      >
        Check Answers
      </button>
    </main>
  );
};

export default QuestionsPage;
