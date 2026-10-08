export type Color = "w" | "b";
export type PieceType = "N" | "B" | "R";

export interface Piece {
  c: Color;
  t: PieceType;
}

export interface PlayerInfo {
  name: string;
  color: Color;
  online: boolean;
}

export interface MoveInfo {
  san: string;
  color: Color;
}

export interface LastMove {
  from: number;
  to: number;
  color: Color;
}

// Full state of a session, as the server sends it.
export interface GameState {
  sessionId: string;
  players: PlayerInfo[];
  board: (Piece | null)[];
  turn: Color;
  moves: MoveInfo[];
  lastMove: LastMove | null;
  result: string | null;
  initialFen: string;
  pgnHeaders: Record<string, string>;
  pgn: string;
}
