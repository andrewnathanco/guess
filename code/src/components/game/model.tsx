
interface Session {}

export interface Game {
  game_key: number;
  today_word: string;
  input: string;
  guesses: string[];
  sessions: Session[];
}
