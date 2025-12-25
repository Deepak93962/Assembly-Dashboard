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

  // 🔄 LIVE PRODUCTION SIMULATION
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

        // 🔒 Realistic assembly delays
        updated[0].count += 1;

        if (updated[1].count < updated[0].count - 1 && Math.random() > 0.4)
          updated[1].count += 1;

        if (updated[2].count < updated[1].count - 1 && Math.random() > 0.5)
          updated[2].count += 1;

        if (updated[3].count < updated[2].count - 1 && Math.random() > 0.6)
          updated[3].count += 1;

        if (updated[4].count < updated[3].count - 2 && Math.random() > 0.7)
          updated[4].count += 1;

        // 🟢 Push minute-wise data to chart
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
            testing: [...s.testing, updated[4].count],
          }));
        }

        return updated;
      });
    }, INTERVAL_SEC * 1000);

    return () => clearInterval(interval);
  }, [mode, isRunning, elapsedSeconds]);

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200">
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
        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-lg p-5 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-3">Production Steps</h2>
          <ProductionTable data={liveData} />
        </div>

        {/* RIGHT: CHART */}
        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-lg p-5">
          {minuteCategories.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <span className="text-3xl">📊</span>
              <p className="mt-2 text-sm">Chart will appear after 1 minute</p>
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
