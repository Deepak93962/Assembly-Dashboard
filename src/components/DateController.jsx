export default function DateController({
  dateMode,
  setDateMode,
  selectedDate,
  setSelectedDate,
  isRunning,
  setIsRunning,
}) {
  return (
    <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-xl shadow">
      {/* Date Mode */}
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

      {/* Date Picker */}
      <input
        type="date"
        disabled={dateMode === "auto"}
        value={selectedDate || ""}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="border rounded px-3 py-2 disabled:opacity-50"
      />

      {/* Production Controls */}
      <div className="flex gap-2 ml-auto">
        <button
          onClick={() => setIsRunning(true)}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          ▶ Start Production
        </button>

        <button
          onClick={() => setIsRunning(false)}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          ⏸ Stop Production
        </button>
      </div>
    </div>
  );
}
