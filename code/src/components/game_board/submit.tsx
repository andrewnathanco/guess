import { useGame } from "../game/context";
import words from "../../util/valid_words.json";
import { createEffect, onCleanup } from "solid-js";

export default function SubmitButton() {
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
    <button
      disabled={game.input == "" || !words.includes(game.input)}
      onclick={() => {
        submit_word();
      }}
      classList={{
        "border-stone-500 bg-stone-500 text-stone-300": game.input == "",
        "border-stone-700 bg-stone-700 text-sun-50": words.includes(game.input),
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
  );
}
