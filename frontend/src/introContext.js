import { createContext, useContext } from 'react';

export const IntroContext = createContext({
  introDone: true,
  introRevealReady: true,
});

export function useIntro() {
  return useContext(IntroContext);
}
