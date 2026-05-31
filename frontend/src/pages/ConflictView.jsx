import React, {useEffect, useState} from "react";
import { detectConflicts } from "../api/apiClient";

function parseExplanation(text) {
  if (!text || typeof text !== "string") return [];
  const pieces = text.split("**");
  const sections = [];
  let currentSection = null;
  let buffer = "";
  const trailingNumRe = /(\d+)\.\s*$/;

  const appendToCurrent = (str) => {
    if (!currentSection || !str) return;
    if (currentSection.items.length > 0) {
      currentSection.items[currentSection.items.length - 1].body += str;
    } else {
      currentSection.body += str;
    }
  };

  for (let i = 0; i < pieces.length; i++) {
    if (i % 2 === 0) {
      buffer += pieces[i];
      continue;
    }
    const bold = pieces[i];
    const m = buffer.match(trailingNumRe);
    if (m && currentSection) {
      appendToCurrent(buffer.slice(0, m.index));
      currentSection.items.push({ number: m[1], title: bold, body: "" });
    } else {
      appendToCurrent(buffer);
      currentSection = { heading: bold, body: "", items: [] };
      sections.push(currentSection);
    }
    buffer = "";
  }
  appendToCurrent(buffer);
  return sections;
}

function ExplanationRender({ text }) {
  const sections = parseExplanation(text);
  if (sections.length === 0) {
    return <div>{text}</div>;
  }
  return (
    <div>
      {sections.map((sec, i) => (
        <div key={i} className="mb-3">
          <h6 className="fw-bold">{sec.heading}</h6>
          {sec.body.trim() && <p className="mb-2">{sec.body.trim()}</p>}
          {sec.items.length > 0 && (
            <ol>
              {sec.items.map((item, j) => (
                <li key={j} className="mb-1">
                  <strong>{item.title}</strong> {item.body.trim()}
                </li>
              ))}
            </ol>
          )}
        </div>
      ))}
    </div>
  );
}

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
          <div className="border p-3 bg-light">
            <ExplanationRender text={result.explanation} />
          </div>
        </div>
      )}
      {result && result.error && <div className="text-danger">Error: {result.error}</div>}
    </div>
  );
}
