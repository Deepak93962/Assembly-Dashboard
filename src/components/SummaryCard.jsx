export default function SummaryCard({ mode, setMode }) {
  const modes = [
    { key: "today", label: "Today (Live)" },
    { key: "week", label: "Week" },
    { key: "month", label: "Month" },
    { key: "year", label: "Year" },
    { key: "custom", label: "Custom" },
    { key: "date", label: "Particular Date" },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-4 flex gap-2 flex-wrap">
      {modes.map((m) => (
        <button
          key={m.key}
          onClick={() => setMode(m.key)}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            mode === m.key
              ? "bg-indigo-500 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}
