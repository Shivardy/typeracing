export function getWords(words: string[], count: number) {
  const shuffled = [...words].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
