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
        enabled: mode === "today",
      },
      toolbar: { show: false },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    markers: {
      size: 5,
    },
    colors: ["#22c55e", "#6366f1", "#f59e0b", "#ec4899", "#38bdf8"],
    xaxis: {
      categories,
      title: {
        text: "Live Timeline",
      },
    },
    yaxis: {
      title: {
        text: "Production Count",
      },
    },
    legend: {
      position: "bottom",
      markers: {
        radius: 12,
      },
    },
    grid: {
      strokeDashArray: 4,
    },
  };

  return (
    <>
      <h2 className="text-lg font-semibold text-gray-800 mb-1">
        Production Trend
      </h2>
      <p className="text-sm text-gray-500 mb-3">
        Minute-wise production growth
      </p>

      <Chart options={options} series={series} type="line" height={350} />
    </>
  );
}
