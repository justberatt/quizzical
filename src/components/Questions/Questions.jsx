import styles from "./Questions.module.css";
import { useState, useEffect } from "react";

const QuestionsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=18&difficulty=medium&type=multiple",
    )
      .then((res) => res.json())
      .then((data) => {
        data.results.forEach((question) => console.log(question.question));
        setData(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading ...</p>;
  return (
    <main className={styles.questionsPageMainContainer}>
      {/* <ul>{data.}</ul> */}
      <button className={styles.checkAnswersBtn}>Check Anwers</button>
    </main>
  );
};

export default QuestionsPage;
