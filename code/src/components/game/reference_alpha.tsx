import { alphabet, get_available_letters } from "../../util/words";
import { useGame } from "./context";

export function ReferenceAlpha() {
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

  const get_reference_alpha = () => {
    return get_available_letters(
      before_words()[before_words().length - 1],
      after_words()[0]
    );
  };

  return (
    <>
      {game.guesses.includes(game.today_word) ? (
        <></>
      ) : (
        <div class="flex flex-col space-y-1 pb-2">
          <div>Available Letters</div>
          <ul class="flex items-center flex-wrap gap-1">
            {alphabet.map((char) => {
              return (
                <li
                  classList={{
                    "text-md text-timberwolf-500":
                      !get_reference_alpha().includes(char.toLowerCase()),
                    "text-xl bg-timberwolf-700 text-cotton-300":
                      get_reference_alpha().includes(char.toLowerCase()),
                  }}
                  class="rounded-lg px-1 "
                >
                  {char.toLowerCase()}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
