from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Transaction(BaseModel):
    id: str
    customer_id: str
    date: datetime
    amount: float
    category: str
    type: str  # income, expense, transfer
    description: Optional[str] = None

class Profile(BaseModel):
    customer_id: str
    name: str
    age: int
    dependents: int
    monthly_income: float
    monthly_emi: float
    monthly_sip: float
    balance: float
    risk_appetite: str  # conservative/moderate/aggressive
