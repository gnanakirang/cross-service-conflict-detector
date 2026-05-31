import React, { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import ConflictView from "./pages/ConflictView";

export default function App() {
  const customerId = "cust_001";
  const [showTransactions, setShowTransactions] = useState(false);
  const [showConflicts, setShowConflicts] = useState(false);

  useEffect(() => {
    const txTimer = setTimeout(() => setShowTransactions(true), 10000);
    const conflictTimer = setTimeout(() => setShowConflicts(true), 20000);
    return () => {
      clearTimeout(txTimer);
      clearTimeout(conflictTimer);
    };
  }, []);

  return (
    <div className="container">
      <h1>Cross-Service Conflict Detector - Demo</h1>
      <hr />
      <Dashboard customerId={customerId} />
      <hr />
      {showTransactions ? (
        <Transactions customerId={customerId} />
      ) : (
        <div className="text-muted">Loading transactions...</div>
      )}
      <hr />
      {showConflicts ? (
        <ConflictView customerId={customerId} />
      ) : (
        <div className="text-muted">Loading conflicts...</div>
      )}
    </div>
  );
}
