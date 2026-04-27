import { decode } from "html-entities";
import { useState } from "react";
import Start from "./components/Start/Start";
import QuestionsPage from "./components/Questions/Questions";

decode("&lt; &gt; &quot; &apos; &amp; &#169; &#8710;");

function App() {
  const [questionsPage, setQuestionsPage] = useState(false);
  const [startPage, setStartPage] = useState(true);

  return (
    <>
      {startPage && (
        <Start
          setQuestionsPage={setQuestionsPage}
          setStartPage={setStartPage}
        />
      )}
      {questionsPage && <QuestionsPage />}
    </>
  );
}

export default App;
