import React from "react";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import ConflictView from "./pages/ConflictView";

export default function App() {
  const customerId = "cust_001";
  return (
    <div className="container">
      <h1>Cross-Service Conflict Detector - Demo</h1>
      <hr />
      <Dashboard customerId={customerId} />
      <hr />
      <Transactions customerId={customerId} />
      <hr />
      <ConflictView customerId={customerId} />
    </div>
  );
}
