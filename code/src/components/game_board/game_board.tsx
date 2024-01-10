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
    <div class="flex flex-1 justify-center overflow-auto">
      <ul class="flex flex-col max-w-screen w-fit text-2xl justify-center items-start lowercase space-y-2">
        {before_words().map((word) => {
          return (
            <Word
              word={word}
              number={game.guesses.indexOf(word) + 1}
              location={WordLocation.before}
            />
          );
        })}
        <Word
          word={game.input}
          number={game.guesses.length + 1}
          location={WordLocation.input}
        />
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
    </div>
  );
}

function Word(props: { number: number; word: string; location: WordLocation }) {
  return (
    <li class="flex space-x-4 justify-center items-center">
      <div class="text-sm">{props.number}</div>
      <div classList={{ "text-4xl": props.location == WordLocation.input }}>
        {props.word}
      </div>
    </li>
  );
}

export { GameBoard };
