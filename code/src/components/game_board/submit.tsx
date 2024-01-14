import { useGame } from "../game/context";
import words from "../../util/valid_words.json";
import { createEffect, onCleanup } from "solid-js";
import { get_share } from "../session/service";

export default function Button() {
  const [game, set_game] = useGame();

  const submit_word = () => {
    if (words.includes(game.input) && !game.guesses.includes(game.input)) {
      set_game("guesses", [...game.guesses, game.input]);
      set_game("input", "");
    }
  };

  const handleKeyboard = (ev: KeyboardEvent) => {
    const code = ev.code;
    document.getElementById("guess-input")?.focus();

    if (code === "Enter") {
      if (game.guesses.includes(game.today_word)) {
        return;
      }

      submit_word();
    }
  };

  createEffect(() => {
    window.addEventListener("keydown", handleKeyboard);

    onCleanup(() => {
      window.removeEventListener("keydown", handleKeyboard);
    });
  });

  return (
    <>
      {game.guesses.includes(game.today_word) ? (
        <div class="flex flex-col space-y-2">
          <button
            onclick={() => {
              const [text, url] = get_share(game);

              try {
                navigator.share({
                  text,
                  url,
                });
              } catch {
                navigator.clipboard.writeText(`${text}\n${url}`);
              }
            }}
            class="border-2 rounded-lg w-full p-2 flex items-center justify-center space-x-2 border-mallard-700 bg-mallard-700 text-sun-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
              />
            </svg>

            <div>Share</div>
          </button>
          <button class="flex flex-col space-y-2">
            <a
              href={`https://www.merriam-webster.com/dictionary/${game.today_word}`}
              target="_blank"
              rel="noopener noreferrer"
              class="border-2 border-sahara-800 rounded-lg w-full p-2 text-sun-50 bg-sahara-800 flex items-center justify-center space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                />
              </svg>

              <div>Define</div>
            </a>
          </button>
        </div>
      ) : (
        <button
          disabled={game.input == "" || !words.includes(game.input)}
          onclick={() => {
            submit_word();
          }}
          classList={{
            "border-stone-500 bg-stone-500 text-stone-300": game.input == "",
            "border-stone-700 bg-stone-700 text-sun-50": words.includes(
              game.input
            ),
            "border-stiletto-700 bg-stiletto-700 text-sun-50": !words.includes(
              game.input
            ),
          }}
          class="border-2 rounded-lg w-full p-2 flex items-center justify-center space-x-2"
        >
          <div>
            {!words.includes(game.input) && game.input != ""
              ? "Invalid word"
              : "Submit"}
          </div>
        </button>
      )}
    </>
  );
}
