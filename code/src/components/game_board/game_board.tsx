import { createEffect } from "solid-js";
import { useGame } from "../game/context";
import { useSession } from "../session/context";

enum WordLocation {
  before,
  input,
  after,
  correct,
}

function GameBoard() {
  const [game, _] = useGame();
  const [session, __] = useSession();

  const before_words = () =>
    game.guesses
      .filter((guess) => {
        return guess < game.today_word;
      })
      .toSorted();

  const after_words = () =>
    game.guesses
      .filter((guess) => {
        return guess > game.today_word;
      })
      .toSorted();

  return (
    <ul class="flex flex-1 overflow-y-auto p-4 flex-col w-full text-2xl justify-center items-start lowercase space-y-2 no-scrollbar no-scrollbar::-webkit-scrollbar">
      {before_words().map((word) => {
        return (
          <Word
            word={word}
            number={game.guesses.indexOf(word) + 1}
            location={WordLocation.before}
          />
        );
      })}
      <div class="text-sm">before</div>
      <div id="guess-input">
        <Word
          word={
            game.guesses.includes(game.today_word)
              ? game.today_word
              : game.input == ""
              ? "enter a word"
              : game.input
          }
          number={game.guesses.length + 1}
          location={
            game.guesses.includes(game.today_word)
              ? WordLocation.correct
              : WordLocation.input
          }
        />
      </div>
      <div class="text-sm">after</div>
      {after_words().map((word) => {
        return (
          <Word
            word={word}
            number={game.guesses.indexOf(word) + 1}
            location={WordLocation.after}
          />
        );
      })}
    </ul>
  );
}

function Word(props: { number: number; word: string; location: WordLocation }) {
  return (
    <li
      classList={{ "text-mallard-700": props.location == WordLocation.correct }}
      class="flex space-x-4 justify-center items-center"
    >
      <div
        classList={{
          "text-xl": props.location == WordLocation.correct,
          "text-sm": props.location != WordLocation.correct,
        }}
      >
        {props.number}
      </div>
      <div
        classList={{
          "text-4xl": props.location == WordLocation.input,
          "text-5xl": props.location == WordLocation.correct,
        }}
      >
        {props.word}
      </div>
    </li>
  );
}

export { GameBoard };
