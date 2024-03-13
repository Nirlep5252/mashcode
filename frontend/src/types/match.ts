export enum MatchWinner {
  Player1 = 1,
  Player2 = 2,
}

export enum MatchStatus {
  Pending = 1,
  Completed = 2,
}

export interface Match {
  id: number;
  created_at: Date;
  winner: MatchWinner;
  status: MatchStatus;
  problem_id: number;
  player1_id: number;
  player2_id: number;
}
