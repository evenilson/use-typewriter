import { useEffect, useRef, useState } from "react";

/**
 * Options for configuring the `useTypeWriter` hook.
 */
interface UseTypeWriterProvider {
  /**
   * list of phrases to be typed one by one.
   */
  texts: string[];

  /**
   * Speed of typing each character, in milliseconds.
   * @default 100
   */
  writeSpeed?: number;

  /**
   * Speed of erasing each character, in milliseconds.
   * @default 50
   */
  eraseSpeed?: number;

  /**
   * Time to pause (in milliseconds) after typing a phrase before starting to erase it.
   * @default 1000
   */
  pauseBeforeDelete?: number;

  /**
   * Time to pause (in milliseconds) between finishing erasing one phrase and starting to type the next phrase.
   * @default 500
   */
  pauseBetweenPhrases?: number;

  /**
   * Whether the animation should repeat indefinitely.
   * @default false
   */
  loop?: boolean;

  /**
   * Callback triggered when all phrases have been typed and erased (only if loop  is false).
   */
  onCycleComplete?: () => void;
}

/**
 * 
 * @param options Configuration options for typing speed, loop behavior, etc. 
 * @returns The current displayed text as it's being typed or erased.
 * 
 * @example
 * const text = useTypeWriter({
 *  texts: ["Wello, world!", "Welcome to my site."],
 *  writeSpeed: 100,
 *  eraseSpeed: 50,
 *  loop: true
 * })
 */
export function useTypeWriter({
  texts,
  writeSpeed = 100,
  eraseSpeed = 50,
  pauseBeforeDelete = 1000,
  pauseBetweenPhrases = 500,
  loop = false,
  onCycleComplete = () => { }
}: UseTypeWriterProvider) {
  const [displayed, setDisplayed] = useState(""); // Current visible text

  // Refs to control typing state without causing re-renders
  const animationFrameRef = useRef<number | null>(null);  // ID from requestAnimationFrame 
  const lastFrameTimeRef = useRef<number>(0);             // Timestamp of the last frame
  const charIndexRef = useRef<number>(0);                 // Current character index
  const phraseIndexRef = useRef<number>(0);               // Current phrase index   
  const isDeletingRef = useRef<boolean>(false);           // Whether we are currently deleting
  const pauseUntilRef = useRef<number | null>(null);      // Pause between transitions

  useEffect(() => {
    let isCancelled = false;

    // Cancel any ongoing animation before starting a new one
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);

    const step = (time: number) => {
      if (isCancelled) return;
      const currentText = texts[phraseIndexRef.current] || "";

      // Handle pauses (e.g., between typing and deleting)
      if (pauseUntilRef.current && time < pauseUntilRef.current) {
        animationFrameRef.current = requestAnimationFrame(step);
        return;
      };

      const delta = time - lastFrameTimeRef.current;
      const speed = isDeletingRef.current ? eraseSpeed : writeSpeed;

      // Continue only if the delay time has passed
      if (delta >= speed) {
        if (!isDeletingRef.current) {
          // Typing mode
          charIndexRef.current = Math.min(charIndexRef.current + 1, currentText.length);
          setDisplayed(currentText.slice(0, charIndexRef.current));

          // Reached the end of the phrase
          if (charIndexRef.current >= currentText.length) {
            isDeletingRef.current = true;
            pauseUntilRef.current = time + pauseBeforeDelete; // Wait before deleting
          }
        } else {
          // Deleting mode
          charIndexRef.current -= 1;
          setDisplayed(currentText.slice(0, charIndexRef.current));

          // Finished deleting
          if (charIndexRef.current <= 0) {
            isDeletingRef.current = false;
            const nextIndex = phraseIndexRef.current + 1;

            if (nextIndex >= texts.length) {
              if (loop) {
                phraseIndexRef.current = 0;
              } else {
                onCycleComplete?.(); // Notify parent
                return; // Stop animation
              }
            } else {
              phraseIndexRef.current = nextIndex;
            }
            charIndexRef.current = 0;
            pauseUntilRef.current = time + pauseBetweenPhrases; // Pause briefly before typing the next phrase
          }
        }
        lastFrameTimeRef.current = time; // Update last action time
      }

      // Keep animation going
      animationFrameRef.current = requestAnimationFrame(step);
    };

    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(step);

    // Clean up on unmount or re-run
    return () => {
      isCancelled = true;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };

  }, [writeSpeed, eraseSpeed, loop, texts, onCycleComplete, pauseBeforeDelete, pauseBetweenPhrases]);

  return displayed
}