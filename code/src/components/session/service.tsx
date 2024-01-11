import { Game } from "../game/model";

function get_share(game: Game) {
  const share_url = `${import.meta.env.VITE_BASE_URL}`;

  return [`Guess #${game.game_key}\nScore: ${game.guesses.length}`, share_url];
}

export { get_share };
