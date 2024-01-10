import { Tile } from "../game_board/game_board";

export enum SessionStatus {
  Current,
  Challenge,
  UserWon,
  ComputerWon,
}

export interface Session {
  status: SessionStatus;
  tiles: Tile[];
}
