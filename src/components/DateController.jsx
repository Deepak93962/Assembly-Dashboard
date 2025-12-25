export default function DateController({
  dateMode,
  setDateMode,
  selectedDate,
  setSelectedDate,
}) {
  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow">
      <div className="flex gap-2">
        <button
          onClick={() => setDateMode("auto")}
          className={`px-4 py-2 rounded ${
            dateMode === "auto" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Auto Date
        </button>

        <button
          onClick={() => setDateMode("manual")}
          className={`px-4 py-2 rounded ${
            dateMode === "manual" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Manual Date
        </button>
      </div>

      <input
        type="date"
        disabled={dateMode === "auto"}
        value={selectedDate || ""}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="border rounded px-3 py-2 disabled:opacity-50"
      />
    </div>
  );
}
