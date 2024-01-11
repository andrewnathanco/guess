import { Meta } from "@solidjs/meta";
import {
  createContext,
  createEffect,
  createSignal,
  type Component,
} from "solid-js";
import { GameProvider, useGame } from "../components/game/context";
import { get_game_key, get_todays_game } from "../components/game/service";
import { GameInfo } from "../components/game/view";
import { GameBoard } from "../components/game_board/game_board";
import { InfoDialogProvider } from "../components/info_dialog/context";
import { InfoDialog } from "../components/info_dialog/dialog";
import Button from "../components/game_board/submit";

const App: Component = () => {
  // dialog context
  let game_info_dialog = createSignal(false);

  let [game, set_game] = useGame();

  createContext(game_info_dialog, { name: "info_dialog" });

  createEffect(() => {
    if (game.game_key != get_game_key()) {
      set_game({
        ...get_todays_game(),
      });
    }

    set_game("game_key", get_game_key());
  });

  return (
    <>
      <Meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=0"
      />
      <InfoDialogProvider>
        <GameProvider>
          <div class="w-full flex flex-col h-full justify-center items-center">
            <div class="flex text-lg justify-between flex-col p-4 space-y-4 h-full text-stack-700 w-96">
              <GameInfo />
              <GameBoard />
              <Button />
              <InfoDialog />
            </div>
          </div>
        </GameProvider>
      </InfoDialogProvider>
    </>
  );
};

export default App;
