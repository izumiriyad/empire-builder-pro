import { useState, useEffect } from "react";

interface UseTypingAnimationOptions {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export const useTypingAnimation = ({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
}: UseTypingAnimationOptions) => {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const currentFullText = texts[textIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          if (displayText.length < currentFullText.length) {
            setDisplayText(currentFullText.slice(0, displayText.length + 1));
          } else {
            // Finished typing, pause then start deleting
            setIsComplete(true);
            setTimeout(() => {
              setIsDeleting(true);
              setIsComplete(false);
            }, pauseDuration);
          }
        } else {
          // Deleting
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            // Finished deleting, move to next text
            setIsDeleting(false);
            setTextIndex((prev) => (prev + 1) % texts.length);
          }
        }
      },
      isComplete ? pauseDuration : isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, isComplete, textIndex, texts, typingSpeed, deletingSpeed, pauseDuration]);

  return { displayText, isComplete };
};
