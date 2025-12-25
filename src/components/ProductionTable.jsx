export default function ProductionTable({ data }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Step</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-right">Production</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.step} className="border-b">
              <td className="p-2">{row.step}</td>
              <td className="p-2">{row.name}</td>
              <td className="p-2 text-right font-semibold">{row.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
