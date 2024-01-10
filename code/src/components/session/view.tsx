import { createEffect } from "solid-js";
import { get_computer_word } from "../../util/words";
import { useGame } from "../game/context";
import { get_todays_game } from "../game/service";
import { useGameInfoDialog } from "../game_info_dialog/context";
import Keyboard from "../keyboard/keyboard";
import { GameBoard } from "../game_board/game_board";
import { useSession } from "./context";
import { SessionStatus } from "./model";
import { get_default_session } from "./service";

function SessionView() {
  let [_, { open, close }] = useGameInfoDialog();
  let [session, set_session] = useSession();
  let [game, set_game] = useGame();

  return (
    <div class="flex flex-col justify-between space-y-2 h-full w-full">
      <GameBoard />
      <div class="flex flex-col space-y-1">
        <Keyboard />
      </div>
    </div>
  );
}

export { SessionView };
