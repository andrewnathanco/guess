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
          <div class="flex h-full w-full flex-col items-center justify-center space-y-2 p-4">
            <div class="rounded-lg p-4 border-2 border-stack-700 flex space-x-1 w-96">
              <div>Play other daily games</div>
              <a class="text-sun-700 underline" href="https://ancgames.com">
                here.
              </a>
            </div>
            <div class="text-stack-700 flex h-full w-96 flex-col justify-between space-y-4 p-4 text-lg">
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
