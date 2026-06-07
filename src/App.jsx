import { useState } from "react";

const MULTIPLIERS = {
  "under-5-min": 0.0,
  "5-30-min": 0.1,
  "30-60-min": 0.2,
  "1-4-hrs": 0.35,
  "4-plus-hrs": 0.5,
};

const LABELS = {
  "under-5-min": "under 5 minutes",
  "5-30-min": "5–30 minutes",
  "30-60-min": "30–60 minutes",
  "1-4-hrs": "1–4 hours",
  "4-plus-hrs": "4+ hours",
};

// UPDATE THIS URL if Calendly link ever changes
const CALENDLY_URL = "https://calendly.com/liviteeholdings/30min";

export default function App() {
  const [leads, setLeads] = useState("");
  const [rate, setRate] = useState("");
  const [commission, setCommission] = useState("");
  const [responseTime, setResponseTime] = useState("");
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);
  const [showError, setShowError] = useState(false);

  const calculate = () => {
    const newErrors = {};
    if (!leads || parseFloat(leads) <= 0) newErrors.leads = true;
    if (!rate || parseFloat(rate) <= 0) newErrors.rate = true;
    if (!commission || parseFloat(commission) <= 0) newErrors.commission = true;
    if (!responseTime) newErrors.responseTime = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setShowError(true);
      setResult(null);
      return;
    }

    setShowError(false);
    const multiplier = MULTIPLIERS[responseTime];
    const annualLoss = Math.round(
      parseFloat(leads) * 12 * (parseFloat(rate) / 100) * parseFloat(commission) * multiplier
    );
    setResult({ annualLoss, multiplier, responseTime });
  };

  const borderStyle = (field) =>
    errors[field]
      ? "1px solid #E24B4A"
      : "1px solid rgba(0,0,0,0.12)";

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f0f0f",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      padding: "3rem 1rem",
      fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      <div style={{ width: "100%", maxWidth: "520px" }}>

        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <p style={{ fontSize: "11px", color: "#5DCAA5", textTransform: "uppercase", letterSpacing: "0.12em", margin: "0 0 0.75rem" }}>
            AgenticLeverage · RealFlow AI Stack
          </p>
          <h1 style={{ fontSize: "28px", fontWeight: "600", color: "#ffffff", margin: "0 0 0.75rem", lineHeight: "1.2" }}>
            Your lead loss calculator
          </h1>
          <p style={{ fontSize: "15px", color: "#888", margin: 0, lineHeight: "1.6" }}>
            Put your numbers in. See what slow response is costing you — annually, in dollars.
          </p>
        </div>

        {/* Fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "1.25rem" }}>

          <div style={{ background: "#1a1a1a", border: borderStyle("leads"), borderRadius: "12px", padding: "1rem 1.25rem" }}>
            <label style={{ display: "block", fontSize: "11px", color: "#666", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>
              Monthly leads
            </label>
            <input
              type="number"
              min="1"
              placeholder="e.g. 20"
              value={leads}
              onChange={(e) => { setLeads(e.target.value); setErrors((prev) => ({ ...prev, leads: false })); }}
              style={{ width: "100%", fontSize: "22px", fontWeight: "500", border: "none", background: "transparent", color: "#ffffff", outline: "none", padding: 0 }}
            />
          </div>

          <div style={{ background: "#1a1a1a", border: borderStyle("rate"), borderRadius: "12px", padding: "1rem 1.25rem" }}>
            <label style={{ display: "block", fontSize: "11px", color: "#666", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>
              Lead-to-close rate (%)
            </label>
            <input
              type="number"
              min="0.1"
              max="100"
              placeholder="e.g. 5"
              value={rate}
              onChange={(e) => { setRate(e.target.value); setErrors((prev) => ({ ...prev, rate: false })); }}
              style={{ width: "100%", fontSize: "22px", fontWeight: "500", border: "none", background: "transparent", color: "#ffffff", outline: "none", padding: 0 }}
            />
          </div>

          <div style={{ background: "#1a1a1a", border: borderStyle("commission"), borderRadius: "12px", padding: "1rem 1.25rem" }}>
            <label style={{ display: "block", fontSize: "11px", color: "#666", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>
              Average commission ($)
            </label>
            <input
              type="number"
              min="1"
              placeholder="e.g. 9000"
              value={commission}
              onChange={(e) => { setCommission(e.target.value); setErrors((prev) => ({ ...prev, commission: false })); }}
              style={{ width: "100%", fontSize: "22px", fontWeight: "500", border: "none", background: "transparent", color: "#ffffff", outline: "none", padding: 0 }}
            />
          </div>

          <div style={{ background: "#1a1a1a", border: borderStyle("responseTime"), borderRadius: "12px", padding: "1rem 1.25rem" }}>
            <label style={{ display: "block", fontSize: "11px", color: "#666", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>
              Your average response time
            </label>
            <select
              value={responseTime}
              onChange={(e) => { setResponseTime(e.target.value); setErrors((prev) => ({ ...prev, responseTime: false })); }}
              style={{ width: "100%", fontSize: "18px", fontWeight: "500", border: "none", background: "transparent", color: responseTime ? "#ffffff" : "#555", outline: "none", padding: 0, cursor: "pointer" }}
            >
              <option value="">Select response time</option>
              <option value="under-5-min">Under 5 minutes</option>
              <option value="5-30-min">5 – 30 minutes</option>
              <option value="30-60-min">30 minutes – 1 hour</option>
              <option value="1-4-hrs">1 – 4 hours</option>
              <option value="4-plus-hrs">4+ hours</option>
            </select>
          </div>

        </div>

        {/* Error message */}
        {showError && (
          <div style={{ background: "rgba(226,75,74,0.12)", border: "1px solid rgba(226,75,74,0.3)", borderRadius: "8px", padding: "0.75rem 1rem", marginBottom: "1rem" }}>
            <p style={{ fontSize: "14px", color: "#E24B4A", margin: 0 }}>Please fill in all fields to see your result.</p>
          </div>
        )}

        {/* Calculate button */}
        <button
          onClick={calculate}
          style={{ width: "100%", padding: "15px", fontSize: "15px", fontWeight: "600", borderRadius: "12px", cursor: "pointer", marginBottom: "1.5rem", background: "#5DCAA5", color: "#0f0f0f", border: "none", letterSpacing: "0.01em" }}
        >
          Calculate my lead loss
        </button>

        {/* Result */}
        {result !== null && (
          <div>
            {result.multiplier === 0 ? (
              <div style={{ background: "rgba(93,202,165,0.1)", border: "1px solid rgba(93,202,165,0.25)", borderRadius: "12px", padding: "1.5rem 1.25rem", marginBottom: "1.5rem", textAlign: "center" }}>
                <p style={{ fontSize: "12px", color: "#5DCAA5", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 0.5rem" }}>You're already fast</p>
                <p style={{ fontSize: "15px", color: "#aaa", margin: 0, lineHeight: "1.6" }}>
                  Responding in under 5 minutes puts you ahead of most agents. RealFlow locks that in — automatically, 24/7, even when you're on a showing.
                </p>
              </div>
            ) : (
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ background: "#1a1a1a", borderRadius: "12px", padding: "1.5rem 1.25rem", marginBottom: "12px" }}>
                  <p style={{ fontSize: "12px", color: "#666", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 0.5rem" }}>
                    Estimated annual lead loss
                  </p>
                  <p style={{ fontSize: "48px", fontWeight: "600", color: "#E24B4A", margin: 0, lineHeight: 1 }}>
                    ${result.annualLoss.toLocaleString()}
                  </p>
                </div>
                <div style={{ background: "#1a1a1a", borderRadius: "12px", padding: "1rem 1.25rem" }}>
                  <p style={{ fontSize: "13px", color: "#666", margin: 0, lineHeight: "1.8" }}>
                    {leads} leads/month × 12 months × {rate}% close rate × ${parseFloat(commission).toLocaleString()} avg commission × {result.multiplier * 100}% loss rate (responding in {LABELS[result.responseTime]}) = <span style={{ color: "#ffffff", fontWeight: "500" }}>${result.annualLoss.toLocaleString()}/year</span>
                  </p>
                </div>
              </div>
            )}

            {/* CTA */}
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "block", width: "100%", padding: "15px", fontSize: "15px", fontWeight: "600", borderRadius: "12px", background: "#ffffff", color: "#0f0f0f", border: "none", textAlign: "center", textDecoration: "none", boxSizing: "border-box" }}
            >
              Book your free onboarding call →
            </a>
            <p style={{ fontSize: "13px", color: "#555", textAlign: "center", margin: "0.75rem 0 0" }}>
              30 minutes. We map out what's leaking and whether RealFlow fixes it.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
