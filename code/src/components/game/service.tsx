import words from "../../util/game_words.json";
import { get_available_letters } from "../../util/words";
import { Game } from "./model";

function padZero(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}

export function get_countdown_till_next_game(): string {
  // Get the current local time
  const now = new Date();

  // midnight EST in UTC
  const midnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    5,
    0,
    0,
    0
  );

  // Calculate the duration until midnight EST
  const durationUntilMidnight = midnight.getTime() - now.getTime();

  const hours = Math.floor(durationUntilMidnight / (1000 * 60 * 60)) + 24;
  const minutes =
    Math.floor((durationUntilMidnight % (1000 * 60 * 60)) / (1000 * 60)) + 60;
  const seconds = Math.floor((durationUntilMidnight % (1000 * 60)) / 1000) + 60;

  return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
}

export function get_game_key() {
  const now: Date = new Date();
  // starting date
  const firstGame: Date = new Date(2024, 0, 6, 5, 0, 0);

  const estOffset = -5 * 60; // EST is UTC-5 hours
  const estFirstGame = new Date(firstGame.getTime() + estOffset * 60 * 1000);

  const duration: number =
    (now.getTime() - estFirstGame.getTime()) / (1000 * 60 * 60 * 24);

  return Math.floor(duration);
}

export function get_todays_game(): Game {
  let today_game_key = get_game_key();
  let today_word = words[today_game_key];

  return {
    game_key: today_game_key,
    input: "",
    guesses: [],
    today_word: today_word,
    sessions: [],
  };
}
