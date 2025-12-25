import Chart from "react-apexcharts";

export default function ProductionChart({ mode, chartData, categories }) {
  const series = [
    { name: "Stator", data: chartData.stator },
    { name: "Rotor", data: chartData.rotor },
    { name: "Wiring", data: chartData.wiring },
    { name: "Final Assembly", data: chartData.final },
    { name: "Testing", data: chartData.testing },
  ];

  const options = {
    chart: {
      type: "line",
      height: 350,
      animations: {
        enabled: mode === "today", // 🔴 only today is live
      },
      toolbar: { show: false },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    markers: {
      size: 4,
    },
    colors: ["#22c55e", "#6366f1", "#f59e0b", "#ec4899", "#38bdf8"],
    xaxis: {
      categories,
      title: {
        text: mode === "today" ? "Live Timeline" : "Date",
      },
    },
    yaxis: {
      title: {
        text: "Production Count",
      },
    },
    legend: {
      position: "bottom",
    },
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Production Trend ({mode.toUpperCase()})
      </h2>

      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
}
