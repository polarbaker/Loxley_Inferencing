import { colors, fonts, shapes, styles, techniques, themes } from './inputs';

// Standard language to ensure logo accuracy and text coherence
const standardLanguage = 'vector logo, clean design, high resolution, centered, no background';

// Function to generate combinations
function generateCombinations<T>(arrays: T[][]): T[][] {
  return arrays.reduce<T[][]>((acc, curr) => acc.flatMap((a) => curr.map((c) => [...a, c])), [[]]);
}

export const generateRandomPromptPermutations = (
  clientPrompt: string,
  numSamples: number,
): string[] => {
  // Generate the prompts
  const prompts: string[] = Array.from({ length: numSamples }).map(() => {
    // Get random item from each array
    const combo = [
      styles[Math.floor(Math.random() * styles.length)],
      colors[Math.floor(Math.random() * colors.length)],
      techniques[Math.floor(Math.random() * techniques.length)],
      shapes[Math.floor(Math.random() * shapes.length)],
      fonts[Math.floor(Math.random() * fonts.length)],
      themes[Math.floor(Math.random() * themes.length)],
    ];

    const [style, color, technique, shape, font, theme] = combo;
    return `${clientPrompt}, ${style}, ${color}, ${technique}, ${shape}, ${font}, ${theme} theme, ${standardLanguage}`;
  });

  return prompts;
};
