import React, {useEffect, useState} from "react";
import { detectConflicts } from "../api/apiClient";

export default function ConflictView({customerId}) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    setLoading(true);
    try {
      const res = await detectConflicts(customerId);
      setResult(res);
    } catch (e) {
      console.error(e);
      setResult({error: e.message});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // auto-run once on mount
    analyze();
  }, [customerId]);

  return (
    <div>
      <h3>Conflict & Recommendations</h3>
      <button className="btn btn-primary mb-3" onClick={analyze} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Now"}
      </button>
      {!result && <div>Waiting for analysis...</div>}
      {result && result.conflicts && (
        <div>
          <h5>Detected Conflicts</h5>
          <pre>{JSON.stringify(result.conflicts, null, 2)}</pre>
        </div>
      )}
      {result && result.explanation && (
        <div>
          <h5>AI Explanation & Actions</h5>
          <div className="border p-3 bg-light">{result.explanation}</div>
        </div>
      )}
      {result && result.error && <div className="text-danger">Error: {result.error}</div>}
    </div>
  );
}
