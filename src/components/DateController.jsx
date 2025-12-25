export default function DateController({
  dateMode,
  setDateMode,
  selectedDate,
  setSelectedDate,
  isRunning,
  setIsRunning,
}) {
  return (
    <div className="flex flex-wrap items-center gap-4 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-lg">
      {/* Date Mode */}
      <div className="flex gap-2">
        <button
          onClick={() => setDateMode("auto")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            dateMode === "auto"
              ? "bg-blue-500 text-white shadow"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Auto Date
        </button>

        <button
          onClick={() => setDateMode("manual")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            dateMode === "manual"
              ? "bg-blue-500 text-white shadow"
              : "bg-gray-200 text-gray-700"
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
        className="border rounded-lg px-3 py-2 disabled:opacity-50"
      />

      {/* Controls */}
      <div className="flex gap-3 ml-auto">
        <button
          onClick={() => setIsRunning(true)}
          className="px-5 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white shadow"
        >
          ▶ Start Production
        </button>

        <button
          onClick={() => setIsRunning(false)}
          className="px-5 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white shadow"
        >
          ⏸ Stop Production
        </button>
      </div>
    </div>
  );
}
