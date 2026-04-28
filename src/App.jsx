import { decode } from "html-entities";
import { useState } from "react";
import Start from "./components/Start/Start";
import QuestionsPage from "./components/Questions/Questions";
import clsx from "clsx";

decode("&lt; &gt; &quot; &apos; &amp; &#169; &#8710;");

function App() {
  const [questionsPage, setQuestionsPage] = useState(false);
  const [startPage, setStartPage] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  return (
    <>
      {startPage && (
        <Start
          setQuestionsPage={setQuestionsPage}
          setStartPage={setStartPage}
          isTransitioning={isTransitioning}
          setIsTransitioning={setIsTransitioning}
        />
      )}
      {questionsPage && <QuestionsPage />}

      <div
        className={clsx("blobYellow", isTransitioning && "transformBlobs")}
      ></div>
      <div
        className={clsx("blobBlue", isTransitioning && "transformBlobs")}
      ></div>
    </>
  );
}

export default App;
