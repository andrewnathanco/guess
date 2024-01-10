import { Game } from "../game/model";
import { Session, SessionStatus } from "./model";
import words from "../../util/valid_words.json";

function get_default_session(): Session {
  return {
    status: SessionStatus.Current,
    tiles: [],
  };
}

function get_share(game: Game, session: Session) {
  const share_url = `${
    import.meta.env.VITE_BASE_URL
  }/share?word=${words.indexOf("test")}&status=${session.status}`;

  return [
    `Challenge #${game.game_key}\nScore: ${
      session.status == SessionStatus.UserWon ? game.guesses.length : "❎"
    }`,
    share_url,
  ];
}

export { get_default_session, get_share };
