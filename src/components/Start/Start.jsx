import styles from "./Start.module.css";
import clsx from "clsx";

const Start = ({
  setQuestionsPage,
  setStartPage,
  isTransitioning,
  setIsTransitioning,
}) => {
  const handleStartClick = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStartPage(false);
      setQuestionsPage(true);
    }, 500);
  };

  return (
    <main
      className={clsx(
        styles.startPageMainContainer,
        isTransitioning && styles.transformText,
      )}
    >
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
    </main>
  );
};

export default Start;
