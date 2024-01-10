import { createEffect } from "solid-js";
import { useGame } from "../game/context";

const TOP: string[] = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const MIDDLE: string[] = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const BOTTOM: string[] = ["Z", "X", "C", "V", "B", "N", "M"];

function Key(props: { letter: string }) {
  const [game, set_game] = useGame();
  const letter = props.letter;

  return (
    <button
      class="w-8 h-16 rounded-lg cursor-pointer border-2 bg-stack-800 border-stack-800 text-cotton-300"
      onclick={() => {
        if (!game.guesses.includes(game.today_word)) {
          let new_input = `${game.input ?? ""}${letter.toLowerCase()}`;
          set_game("input", new_input);
        }
      }}
    >
      {letter}
    </button>
  );
}

function TopKeys() {
  return (
    <>
      {TOP.map((lett) => (
        <Key letter={lett.toString()} />
      ))}
    </>
  );
}

function MiddleKeys() {
  return (
    <>
      {MIDDLE.map((lett) => (
        <Key letter={lett.toString()} />
      ))}
    </>
  );
}

function BottomKeys() {
  return (
    <>
      {BOTTOM.map((lett) => (
        <Key letter={lett.toString()} />
      ))}
    </>
  );
}
export { BottomKeys, MiddleKeys, TopKeys };
