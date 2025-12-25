import Header from "../components/Header";
import DateController from "../components/DateController";
import SummaryCard from "../components/SummaryCard";
import ProductionTable from "../components/ProductionTable";
import React from "react";
import { useState } from "react";

export default function Dashboard() {
  const [mode, setMode] = useState("today");
  const [dateMode, setDateMode] = useState("auto");
  const [selectedDate, setSelectedDate] = useState(null);

  const dummyData = [
    { step: 1, name: "Stator Assembly", count: 27 },
    { step: 2, name: "Rotor Assembly", count: 23 },
    { step: 3, name: "Wiring", count: 19 },
    { step: 4, name: "Final Assembly", count: 22 },
    { step: 5, name: "Testing", count: 9 },
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <Header />

      <DateController
        dateMode={dateMode}
        setDateMode={setDateMode}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <SummaryCard mode={mode} setMode={setMode} />

      <ProductionTable data={dummyData} />
    </div>
  );
}
