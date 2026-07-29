import { useState, useRef, useLayoutEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import faqData from "./faqData";
import "./qna.css";

const AccordionItem = ({ item }) => {
  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [item.answer]);

  return (
    <div className="qna">
      <button
        type="button"
        className="ques"
        onClick={() => setOpen(!open)}
      >
        <span>{item.question}</span>

        <FiChevronDown
          className={`icon ${open ? "rotate" : ""}`}
        />
      </button>

      <div
        className="answer-wrapper"
        style={{
          maxHeight: open ? `${height}px` : "0px",
        }}
      >
        <div
          ref={contentRef}
          className="answer"
        >
          {item.answer}
        </div>
      </div>
    </div>
  );
};

const Qna = () => {
  return (
    <div className="qna-section">
      {faqData.map((item, index) => (
        <AccordionItem
          key={index}
          item={item}
        />
      ))}
    </div>
  );
};

export default Qna;