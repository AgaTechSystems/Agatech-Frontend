import { useState, useRef } from "react";


type FaqT = {
  id: number;
  question: string;
  answer: string;
};

const AccordionItem = ({
  handleToggle,
  active,
  faq,
}: {
  handleToggle: (index: number) => void;
  faq: FaqT;
  active: number;
}) => {
  const contentEl = useRef<HTMLDivElement>(null);
  const { question, id, answer } = faq;

  return (
    <div className={`accordion-item ${active === id ? "active" : ""}`}>
      <div className={`faq-question-box ${active === id ? "active" : ""}`}>
        <div
          className={`h-[64px] flex justify-between items-center ${
            active === id ? "active" : ""
          }`}
          onClick={() => handleToggle(id)}
        >
          <h5 className="faq-question">{question}</h5>

          <button className="text-2xl xl:text-4xl text-white">
            {active === id ?"" : ""}
          </button>
        </div>
      </div>

      {/* @ts-ignore */}
      <div
        ref={contentEl}
        className={`answer-collapse-box ${active === id ? "show" : ""}`}
        style={
          active === id
            ? { height: contentEl.current?.scrollHeight }
            : { height: "0px" }
        }
      >
        <div className="p-6 font-rajdhani text-[17px] font-normal leading-[26px]">
          {answer}
        </div>
      </div>
    </div>
  );
};

export default function Accordion({ faqs }: { faqs: FaqT[] }) {
  const [active, setActive] = useState<number>(null as any);

  const handleToggle = (index: number) => {
    if (active === index) {
      setActive(null as any);
    } else {
      setActive(index);
    }
  };

  return (
    <>
      <div className="w-full max-w-full overflow-hidden">
        <hr className="border-b-[1px] border-[#828282]" />
        {faqs.map((faq, index) => {
          return (
            <AccordionItem
              key={index}
              active={active}
              handleToggle={handleToggle}
              faq={faq}
            />
          );
        })}
      </div>
    </>
  );
}
