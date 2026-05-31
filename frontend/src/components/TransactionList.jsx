import React from "react";

export default function TransactionList({transactions}) {
  if (!transactions) return <div>Loading transactions...</div>;
  return (
    <div>
      <h5>Recent Transactions</h5>
      <ul className="list-group">
        {transactions.map(tx => (
          <li key={tx.id} className="list-group-item d-flex justify-content-between">
            <div>
              <strong>{tx.category}</strong> - {tx.description}
              <div className="text-muted small">{new Date(tx.date).toLocaleString()}</div>
            </div>
            <div>₹{tx.amount}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
