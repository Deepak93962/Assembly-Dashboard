import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import DateController from "../components/DateController";
import SummaryCard from "../components/SummaryCard";
import ProductionTable from "../components/ProductionTable";
import ProductionChart from "../components/ProductionChart";

export default function Dashboard() {
  const [mode, setMode] = useState("today");
  const [dateMode, setDateMode] = useState("auto");
  const [selectedDate, setSelectedDate] = useState(null);
  const [isRunning, setIsRunning] = useState(true);

  const INTERVAL_SEC = 3;
  const MAX_MINUTES = 5;

  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const [liveData, setLiveData] = useState([
    { step: 1, name: "Stator Assembly", count: 0 },
    { step: 2, name: "Rotor Assembly", count: 0 },
    { step: 3, name: "Wiring", count: 0 },
    { step: 4, name: "Final Assembly", count: 0 },
    { step: 5, name: "Testing", count: 0 },
  ]);

  const [minuteCategories, setMinuteCategories] = useState([]);
  const [minuteSeries, setMinuteSeries] = useState({
    stator: [],
    rotor: [],
    wiring: [],
    final: [],
    testing: [],
  });

  // 🔄 LIVE GENERATOR
  useEffect(() => {
    if (mode !== "today" || !isRunning) return;

    const interval = setInterval(() => {
      setElapsedSeconds((prev) => {
        const next = prev + INTERVAL_SEC;
        if (next > MAX_MINUTES * 60) {
          setIsRunning(false);
          return prev;
        }
        return next;
      });

      setLiveData((prev) => {
        const updated = prev.map((s) => ({ ...s }));

    updated[0].count += 1; // Stator always moves

    // Rotor
    if (updated[1].count < updated[0].count - 1 && Math.random() > 0.4) {
      updated[1].count += 1;
    }

    // Wiring
    if (updated[2].count < updated[1].count - 1 && Math.random() > 0.5) {
      updated[2].count += 1;
    }

    // Final Assembly
    if (updated[3].count < updated[2].count - 1 && Math.random() > 0.6) {
      updated[3].count += 1;
    }

    // Testing (slowest)
    if (updated[4].count < updated[3].count - 2 && Math.random() > 0.7) {
      updated[4].count += 1;
    }

        if (
          elapsedSeconds !== 0 &&
          elapsedSeconds % 60 === 0 &&
          minuteCategories.length < MAX_MINUTES
        ) {
          const minute = elapsedSeconds / 60;

          setMinuteCategories((c) => [...c, `${minute} min`]);
         setMinuteSeries((s) => ({
           stator: [...s.stator, updated[0].count],
           rotor: [...s.rotor, updated[1].count],
           wiring: [...s.wiring, updated[2].count],
           final: [...s.final, updated[3].count],
           testing: [...s.testing, updated[4].count], // completed motors
         }));

        }

        return updated;
      });
    }, INTERVAL_SEC * 1000);

    return () => clearInterval(interval);
  }, [mode, isRunning, elapsedSeconds]);

  const tableData = liveData;

  const isChartReady =
    minuteSeries.stator.length > 0 &&
    minuteSeries.stator.length === minuteSeries.rotor.length &&
    minuteSeries.stator.length === minuteSeries.wiring.length &&
    minuteSeries.stator.length === minuteSeries.final.length &&
    minuteSeries.stator.length === minuteSeries.testing.length;

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <Header />

      <DateController
        dateMode={dateMode}
        setDateMode={setDateMode}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
      />

      <SummaryCard mode={mode} setMode={setMode} />

      {/* 🔥 MAIN DASHBOARD AREA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[520px]">
        {/* LEFT: TABLE */}
        <div className="bg-white rounded-xl shadow p-4 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-3">Production Steps</h2>
          <ProductionTable data={tableData} />
        </div>

        {/* RIGHT: CHART */}
        <div className="bg-white rounded-xl shadow p-4">
          {minuteCategories.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-500">
              ⏳ Chart will appear after 1 minute
            </div>
          ) : (
            <ProductionChart
              mode={mode}
              chartData={minuteSeries}
              categories={minuteCategories}
            />
          )}
        </div>
      </div>
    </div>
  );
}
