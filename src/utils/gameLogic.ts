// Client side part of the game logic: enough to check locally whether a
// dropped piece makes sense (otherwise the referee blows his whistle).
// The server owns the complete rules (see chessthreeinarowserver/gameLogic.js).

import type { Piece } from "@/types/game";

export const FILES = "abcdefgh";

export function fileOf(idx: number): number {
  return idx % 8;
}

export function rankOf(idx: number): number {
  return Math.floor(idx / 8);
}

export function squareName(idx: number): string {
  return FILES[fileOf(idx)] + (rankOf(idx) + 1);
}

export function squareIndex(name: string): number {
  return (Number(name[1]) - 1) * 8 + FILES.indexOf(name[0]);
}

function isOnBoard(file: number, rank: number): boolean {
  return file >= 0 && file < 8 && rank >= 0 && rank < 8;
}

const KNIGHT_DELTAS = [
  [1, 2], [2, 1], [2, -1], [1, -2],
  [-1, -2], [-2, -1], [-2, 1], [-1, 2],
];
const ROOK_DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1]];
const BISHOP_DIRS = [[1, 1], [1, -1], [-1, 1], [-1, -1]];

// All legal target squares - no capturing, no jumping over pieces.
export function pieceMoves(board: (Piece | null)[], idx: number): number[] {
  const piece = board[idx];
  if (!piece) return [];
  const file = fileOf(idx);
  const rank = rankOf(idx);
  const moves: number[] = [];

  if (piece.t === "N") {
    for (const [df, dr] of KNIGHT_DELTAS) {
      const f = file + df;
      const r = rank + dr;
      if (isOnBoard(f, r) && !board[r * 8 + f]) moves.push(r * 8 + f);
    }
  } else {
    const dirs = piece.t === "R" ? ROOK_DIRS : BISHOP_DIRS;
    for (const [df, dr] of dirs) {
      let f = file + df;
      let r = rank + dr;
      while (isOnBoard(f, r)) {
        const idx2 = r * 8 + f;
        if (board[idx2]) break;
        moves.push(idx2);
        f += df;
        r += dr;
      }
    }
  }
  return moves;
}

// Is dropping the piece from `from` to `to` plausible?
export function isLegalDrop(
  board: (Piece | null)[],
  from: number,
  to: number,
  pieceColor: string,
  turn: string
): boolean {
  if (from === to) return false;
  const piece = board[from];
  if (!piece || piece.c !== pieceColor) return false;
  if (turn !== pieceColor) return false;
  return pieceMoves(board, from).includes(to);
}
