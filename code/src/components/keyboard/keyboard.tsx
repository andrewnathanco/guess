import { createEffect, onCleanup } from "solid-js";
import { TopKeys, MiddleKeys, BottomKeys } from "./key";
import { useGame } from "../game/context";
import words from "../../util/valid_words.json";
import { useGameInfoDialog } from "../game_info_dialog/context";
import { useSession } from "../session/context";
import { Session, SessionStatus } from "../session/model";
import {
  get_available_letters,
  get_tiles_from_computer,
} from "../../util/words";

function Keyboard() {
  const [game, set_game] = useGame();
  const [session, set_session] = useSession();
  const [_, { open }] = useGameInfoDialog();

  const submit_word = () => {
    if (words.includes(game.input) && !game.guesses.includes(game.input)) {
      set_game("guesses", [...game.guesses, game.input]);
      set_game("input", "");
    }
  };

  const remove_word = () => {
    if (game.input != "") {
      set_game("input", game.input.substring(0, game.input.length - 1));
    } else {
      set_game("input", "");
    }
  };

  const handleKeyboard = (ev: KeyboardEvent) => {
    if (game.guesses.includes(game.today_word)) {
      return;
    }

    document.getElementById("guess-input")?.scrollIntoView();

    ev.preventDefault();

    const code = ev.code;
    if (code.startsWith("Key")) {
      const key = code.slice(3);
      let new_input = `${game.input ?? ""}${key}`;
      set_game("input", new_input.toLowerCase());
    }

    if (code === "Enter") {
      submit_word();
    }

    if (code === "Backspace") {
      remove_word();
    }
  };

  createEffect(() => {
    window.addEventListener("keydown", handleKeyboard);

    onCleanup(() => {
      window.removeEventListener("keydown", handleKeyboard);
    });
  });

  return (
    <div class="flex flex-col space-y-2">
      <div
        id="keyboard"
        class="p-4 flex flex-col space-y-1 w-full items-center text-sm text-mallard-900"
      >
        <div id="top-row" class="flex flex-row space-between space-x-1">
          <TopKeys />
        </div>
        <div id="middle-row" class="flex flex-row space-between space-x-1">
          <MiddleKeys />
        </div>
        <div id="bottom-row" class="flex flex-row space-between space-x-1">
          <button
            class="border-2 p-1 h-16 bg-stack-400 border-stack-400 text-sun-50 rounded-lg cursor-pointer items-center justify-center flex"
            onclick={submit_word}
          >
            ENTER
          </button>
          <BottomKeys />
          <button
            class="border-2 w-12 h-16 bg-stiletto-600 border-stiletto-600 text-sun-50 rounded-lg cursor-pointer justify-center items-center flex"
            onclick={remove_word}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6"
            >
              <path
                fill-rule="evenodd"
                d="M2.515 10.674a1.875 1.875 0 000 2.652L8.89 19.7c.352.351.829.549 1.326.549H19.5a3 3 0 003-3V6.75a3 3 0 00-3-3h-9.284c-.497 0-.974.198-1.326.55l-6.375 6.374zM12.53 9.22a.75.75 0 10-1.06 1.06L13.19 12l-1.72 1.72a.75.75 0 101.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 101.06-1.06L15.31 12l1.72-1.72a.75.75 0 10-1.06-1.06l-1.72 1.72-1.72-1.72z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {/* {game.guesses.includes(game.today_word) ? <ShareButton /> : <></>} */}
    </div>
  );
}

// function ShareButton() {
//   const [game, _] = useGame();

//   return (
//     <button
//       onclick={() => {
//         const [text, url] = get_share(game);

//         try {
//           navigator.share({
//             text,
//             url,
//           });
//         } catch {
//           navigator.clipboard.writeText(`${text}\n${url}`);
//         }
//       }}
//       class="border-2 border-mallard-700 rounded-lg w-full p-2 text-sun-50 bg-mallard-700 flex items-center justify-center space-x-2"
//     >
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 24 24"
//         fill="currentColor"
//         class="w-6 h-6"
//       >
//         <path
//           fill-rule="evenodd"
//           d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z"
//           clip-rule="evenodd"
//         ></path>
//       </svg>

//       <div>Share</div>
//     </button>
//   );
// }

export default Keyboard;
