from lib.models import MatchWinner


def get_elo_rating_change(
    player1_rating: int,
    player2_rating: int,
    winner: MatchWinner,
    const_k: int = 32,
    const_c: int = 400,
) -> int:
    expected = 1 / (1 + 10 ** ((player2_rating - player1_rating) / const_c))
    if winner == MatchWinner.PLAYER1:
        return round(const_k * (1 - expected))
    elif winner == MatchWinner.PLAYER2:
        return round(const_k * (0 - expected))
    return round(const_k * (0.5 - expected))
