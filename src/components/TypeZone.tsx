import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import useDebounce from "../hooks/useDebounce";
import { Common300 } from "../utils/constants";
import { getWords } from "../utils/utils";

const Words = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-content: flex-start;
  user-select: none;
  color: ${(props) => props.theme.colors.text2};
`;

const Caret = styled.div<{ animateCaret: boolean }>`
  width: 2px;
  height: 1.5rem;
  background: ${(props) => props.theme.colors.brand};
  animation: ${(props) =>
    props.animateCaret ? "caretFlashSmooth 1s infinite" : "none"};
  position: absolute;
  border-radius: 0.5rem;
  transform: scale(1.5);

  @keyframes caretFlashSmooth {
    0%,
    100% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
  }
`;

const TypeZone = () => {
  const words = useMemo(() => getWords(Common300, 50), []);
  const [visitedWords, setVisitedWords] = useState(words.map(() => false));
  const [userInput, setUserInput] = useState("");

  const [caretPos, setCaretPos] = useState<[number, number]>([0, 0]);
  const [animateCaret, setAnimateCaret] = useState(true);

  const handleKeyPress = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (animateCaret) setAnimateCaret(false);
      const controlKeys = [
        "Shift",
        "Tab",
        "Escape",
        "CapsLock",
        "Control",
        "Alt",
        "Meta",
        "ArrowLeft",
        "ArrowUp",
        "ArrowRight",
        "ArrowDown",
        "Enter",
      ];
      if (controlKeys.includes(e.key)) return;
      setUserInput((userInput) => {
        if (e.key === "Backspace") return userInput.slice(0, -1);
        else return userInput + e.key;
      });
    },
    [animateCaret]
  );

  useEffect(() => {
    const typedWords = userInput
      .split(" ")
      .filter((word) => word)
      .map(() => true);
    setVisitedWords(
      words.map((word, index) => {
        if (typedWords[index]) return typedWords[index];
        return false;
      })
    );
  }, [userInput, words]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  const typedWords = userInput.split(" ");
  const [left, top] = caretPos;

  return (
    <>
      <Caret style={{ left, top }} animateCaret={animateCaret} />
      <Words>
        {words.map((word, index) => (
          <Word
            key={index}
            word={word}
            userInput={typedWords[index] || ""}
            isActive={index === typedWords.length - 1}
            isVisited={visitedWords[index]}
            setCaretPos={setCaretPos}
          />
        ))}
      </Words>
    </>
  );
};

export default TypeZone;

const StyledWord = styled.div<{ isError: boolean; isActive: boolean }>`
  font-size: ${(props) => props.theme.size.xl};
  line-height: ${(props) => props.theme.lineHeights.body};
  margin: ${(props) => props.theme.size.xxxs};
  border-bottom: ${(props) =>
    props.isError ? `2px solid ${props.theme.colors.error}` : "none"};
`;
type WordProps = {
  isActive: boolean;
  isVisited: boolean;
  word: string;
  userInput: string;
  setCaretPos: React.Dispatch<React.SetStateAction<[number, number]>>;
};
const Word = memo(
  ({ word, userInput, isActive, isVisited, setCaretPos }: WordProps) => {
    const isError = isVisited && !isActive && word !== userInput;
    const [visitedLetters, setVisitedLetters] = useState(
      userInput.split("").map(() => false)
    );
    useEffect(() => {
      const typedWords = userInput.split("").map(() => true);
      setVisitedLetters(
        userInput.split("").map((word, index) => {
          if (typedWords[index]) return typedWords[index];
          return false;
        })
      );
    }, [userInput]);
    const temp =
      userInput.length > word.length
        ? word + userInput.slice(word.length)
        : word;
    console.log({ word, userInput, temp });
    return (
      <StyledWord
        isError={isError}
        isActive
        onBlur={(e) => e.currentTarget.focus()}
      >
        {temp.split("").map((char, index) => (
          <Letter
            key={index}
            letter={char}
            userInput={userInput[index] || ""}
            isActive={
              isActive &&
              ((userInput.length === 0 && index === 0) ||
                index === userInput.length - 1)
            }
            isVisited={visitedLetters[index] || false}
            setCaretPos={setCaretPos}
          />
        ))}
      </StyledWord>
    );
  }
);

const StyledLetter = styled.span<{ isError: boolean; isCorrect: boolean }>`
  color: ${(props) => {
    if (props.isError) return props.theme.colors.error;
    if (props.isCorrect) return props.theme.colors.text1;
    return "none";
  }};
`;
type LetterProps = {
  isActive: boolean;
  isVisited: boolean;
  letter: string;
  userInput: string;
  setCaretPos: React.Dispatch<React.SetStateAction<[number, number]>>;
};
const Letter = memo(
  ({ letter, userInput, isActive, isVisited, setCaretPos }: LetterProps) => {
    const isError = isVisited && letter !== userInput;
    const isCorrect = isVisited && letter === userInput;
    const ref = useRef<HTMLSpanElement | null>(null);
    useEffect(() => {
      if (isActive && ref.current) {
        const { x, y, width } = ref.current?.getBoundingClientRect();
        const left = isVisited ? x + width : x;
        setCaretPos([left, y]);
      }
    }, [isActive, isVisited, setCaretPos]);
    return (
      <StyledLetter isError={isError} isCorrect={isCorrect} ref={ref}>
        {letter}
      </StyledLetter>
    );
  }
);
