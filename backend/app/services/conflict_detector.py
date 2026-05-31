from datetime import datetime, timedelta

def detect_conflicts(profile, transactions):
    """
    Simple heuristic-based conflict detector for demo:
    - Liquidity conflict: monthly_emi + monthly_sip > balance
    - Timing conflict: if there is an expense within 3 days and no income within 7 days
    - Optimization conflict: high-interest credit usage while balance > threshold (not implemented here)
    Returns a list of conflict dicts.
    """
    emi = profile.get("monthly_emi", 0)
    sip = profile.get("monthly_sip", 0)
    balance = profile.get("balance", 0)
    conflicts = []

    # Liquidity
    if emi + sip > balance:
        conflicts.append({
            "type": "liquidity",
            "message": f"EMI ({emi}) + SIP ({sip}) > Balance ({balance})",
            "severity": "high"
        })

    # Timing: check upcoming expenses within next 3 days and next income date
    now = datetime.utcnow()
    upcoming_expenses = [tx for tx in transactions if tx.get("type") == "expense" and datetime.fromisoformat(tx["date"]) <= now + timedelta(days=3)]
    upcoming_incomes = [tx for tx in transactions if tx.get("type") == "income" and datetime.fromisoformat(tx["date"]) >= now]
    if upcoming_expenses and not upcoming_incomes:
        conflicts.append({
            "type": "timing",
            "message": "Upcoming expenses in next 3 days with no incoming salary detected",
            "severity": "medium"
        })

    # Placeholder for more heuristics
    return conflicts
