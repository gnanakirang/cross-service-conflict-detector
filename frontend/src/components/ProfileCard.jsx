import React from "react";

export default function ProfileCard({profile}) {
  if (!profile) return <div>Loading profile...</div>;
  return (
    <div className="card p-3">
      <h5>{profile.name}</h5>
      <div>Monthly Income: ₹{profile.monthly_income}</div>
      <div>Monthly EMI: ₹{profile.monthly_emi}</div>
      <div>Monthly SIP: ₹{profile.monthly_sip}</div>
      <div>Balance: ₹{profile.balance}</div>
      <div>Risk: {profile.risk_appetite}</div>
    </div>
  );
}
