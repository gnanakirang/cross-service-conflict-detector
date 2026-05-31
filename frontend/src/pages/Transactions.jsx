import React, {useEffect, useState} from "react";
import { getTransactions } from "../api/apiClient";
import TransactionList from "../components/TransactionList";

export default function Transactions({customerId}) {
  const [transactions, setTransactions] = useState(null);
  useEffect(() => {
    getTransactions(customerId).then(setTransactions).catch(console.error);
  }, [customerId]);

  return (
    <div>
      <h3>Transactions</h3>
      <TransactionList transactions={transactions} />
    </div>
  );
}
