export default function DataTable({ headers, rows, highlightFirst = false }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="text-left px-3 py-2 font-semibold text-gray-700 whitespace-nowrap"></th>
            {headers.map((h, i) => (
              <th key={i} className="text-left px-3 py-2 font-semibold text-gray-700 whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} hover:bg-blue-50/30 transition-colors`}>
              <td className={`px-3 py-2 whitespace-nowrap ${highlightFirst ? 'font-medium text-gray-800' : 'text-gray-600'}`}>
                {row.label}
              </td>
              {row.cells.map((cell, j) => (
                <td key={j} className="px-3 py-2 text-gray-800 font-medium">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
