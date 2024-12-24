from lib.models import MatchWinner


def get_elo_rating_change(
    player1_rating: int, player2_rating: int, winner: MatchWinner
) -> int:
    K = 32
    R1 = 10 ** (player1_rating / 400)
    R2 = 10 ** (player2_rating / 400)

    E1 = R1 / (R1 + R2)
    E2 = R2 / (R1 + R2)

    # From player1's perspective
    if winner == MatchWinner.PLAYER1:
        return round(K * (1 - E1))  # Positive for player1
    else:
        return round(K * (0 - E1))  # Negative for player1
