import { createEffect } from "solid-js";
import { useGame } from "../game/context";

enum WordLocation {
  before,
  input,
  after,
  correct,
}

function GameBoard() {
  const [game, _] = useGame();

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
    <ul class="flex flex-col overflow-y-auto p-4 w-full text-2xl justify-start items-start lowercase space-y-2 no-scrollbar no-scrollbar::-webkit-scrollbar">
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
      <Word
        word={
          game.guesses.includes(game.today_word)
            ? game.today_word
            : game.input == ""
            ? "enter a word"
            : game.input
        }
        number={
          game.guesses.includes(game.today_word)
            ? game.guesses.length
            : game.guesses.length + 1
        }
        location={
          game.guesses.includes(game.today_word)
            ? WordLocation.correct
            : WordLocation.input
        }
      />
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
  const [game, set_game] = useGame();

  return (
    <li
      classList={{ "text-mallard-700": props.location == WordLocation.correct }}
      class="flex space-x-4 justify-center items-center "
    >
      <div
        classList={{
          "text-xl": props.location == WordLocation.correct,
          "text-sm": props.location != WordLocation.correct,
        }}
      >
        {props.number}
      </div>
      {props.location == WordLocation.input ? (
        <input
          class="text-4xl rounded-lg bg-transparent max-w-64 p-2 placeholder:text-stack-700 border-transparent !outline-none"
          id="guess-input"
          value={game.input}
          autofocus
          oninput={(e) => {
            e.preventDefault();
            set_game("input", e.target.value.trim().toLocaleLowerCase());
          }}
          placeholder="input a word"
        />
      ) : (
        <div
          classList={{
            "text-5xl": props.location == WordLocation.correct,
          }}
        >
          {props.word}
        </div>
      )}
    </li>
  );
}

export { GameBoard };
