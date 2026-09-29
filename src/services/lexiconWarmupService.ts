/**
 * Lexicon Background Warmup Service
 *
 * Runs during idle interaction windows after application cold boot,
 * pre-populating the in-memory indexes for Hebrew and Greek lexicons
 * so that subsequent user navigation to Strong's, Hebrew, or Greek
 * screens opens instantly in 0 milliseconds.
 */

import { InteractionManager } from 'react-native';
import { getBaseHebrewEntries, getBaseGreekEntries } from '../data/lexiconData';

let hasWarmedUp = false;

export function warmUpLexiconInBackground(delayMs: number = 2000): void {
  if (hasWarmedUp) return;
  hasWarmedUp = true;

  setTimeout(() => {
    InteractionManager.runAfterInteractions(() => {
      try {
        // 1. Pre-warm Hebrew canonical index during idle frames
        getBaseHebrewEntries();

        // 2. Stagger Greek canonical index to prevent CPU contention
        setTimeout(() => {
          InteractionManager.runAfterInteractions(() => {
            try {
              getBaseGreekEntries();
            } catch (err) {
              console.warn('[LexiconWarmup] Greek warmup notice:', err);
            }
          });
        }, 1200);
      } catch (err) {
        console.warn('[LexiconWarmup] Hebrew warmup notice:', err);
      }
    });
  }, delayMs);
}
