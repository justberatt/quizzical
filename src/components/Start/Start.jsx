import styles from "./Start.module.css";

const Start = ({ setQuestionsPage, setStartPage }) => {
  const handleStartClick = () => {
    setQuestionsPage(true);
    setStartPage(false);
  };

  return (
    <main className={styles.startPageMainContainer}>
      <h1 className={styles.heading}>Quizzical</h1>
      <p className={styles.description}>
        This is a short quizz game consisting of 5 questions
      </p>
      <button
        type="button"
        className={styles.startBtn}
        onClick={handleStartClick}
      >
        Start Quiz
      </button>
      <div className={styles.blobYellow}></div>
      <div className={styles.blobBlue}></div>
    </main>
  );
};

export default Start;
