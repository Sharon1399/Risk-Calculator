"use client";

import { useState, Fragment, useMemo } from "react";
import { motion } from "framer-motion";

const levels = [
  { value: 1, label: "Low" },
  { value: 2, label: "Moderate" },
  { value: 3, label: "Significant" },
  { value: 4, label: "High" },
  { value: 5, label: "Critical" },
];

// Risk severity interpretation
function getSeverity(score) {
  if (score <= 3) return "Negligible";
  if (score <= 6) return "Low";
  if (score <= 10) return "Moderate";
  if (score <= 15) return "Significant";
  if (score <= 20) return "High";
  return "Critical";
}

export default function Home() {
  const [risk, setRisk] = useState(1);
  const [hazard, setHazard] = useState(1);

  const result = risk * hazard;
    const severity = useMemo(() => getSeverity(risk * hazard));

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Risk Calculator</h1>

      {/* Selectors */}
      <div className="flex gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Risk Level</label>
          <select
            value={risk}
            onChange={(e) => setRisk(Number(e.target.value))}
            className="p-2 rounded border"
          >
            {levels.map((l) => (
              <option key={l.value} value={l.value}>
                {l.value} - {l.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Hazard Level</label>
          <select
            value={hazard}
            onChange={(e) => setHazard(Number(e.target.value))}
            className="p-2 rounded border"
          >
            {levels.map((l) => (
              <option key={l.value} value={l.value}>
                {l.value} - {l.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Risk Matrix */}
      <div className="grid grid-cols-6 gap-2 mb-6">
        <div className="font-bold">Risk/ Hazard</div>
        {levels.map((l) => (
          <div key={l.value} className="font-bold text-center">
            {l.value}
          </div>
        ))}
        {levels.map((r) => (
          <Fragment key={"r" + r.value}>
            <div className="font-bold flex items-center">
              {r.value}
            </div>
            {levels.map((h) => (
              <div
                key={r.value + "-" + h.value}
                className={`h-12 flex items-center justify-center rounded text-sm 
                  ${r.value * h.value < 6 ? "bg-green-200" : ""}
                  ${r.value * h.value >= 6 && r.value * h.value < 12 ? "bg-yellow-200" : ""}
                  ${r.value * h.value >= 12 && r.value * h.value < 20 ? "bg-orange-300" : ""}
                  ${r.value * h.value >= 20 ? "bg-red-400 text-white" : ""}
                `}
              >
                {r.value * h.value}
              </div>
            ))}
          </Fragment>
        ))}
      </div>

      {/* Result */}
      <motion.div
        key={result}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="p-6 bg-white shadow rounded-2xl text-center"
      >
        <h2 className="text-xl font-semibold mb-2">Calculated Risk</h2>
        <p className="text-2xl font-bold text-blue-600">{result}</p>
        <p className="text-lg font-medium mt-2">{severity}</p>
      </motion.div>

      {/* Placeholder for future tracking */}
      <div className="mt-6 text-gray-500 text-sm italic">
        User tracking parameters will be added here...
      </div>
    </div>
  );
}
