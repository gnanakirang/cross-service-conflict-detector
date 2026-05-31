import React, {useEffect, useState} from "react";
import { getProfile } from "../api/apiClient";
import ProfileCard from "../components/ProfileCard";

export default function Dashboard({customerId}) {
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    getProfile(customerId).then(setProfile).catch(console.error);
  }, [customerId]);

  return (
    <div>
      <h3>Dashboard</h3>
      <ProfileCard profile={profile} />
    </div>
  );
}
