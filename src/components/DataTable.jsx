export default function DataTable({ headers, rows, highlightFirst = false }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-stone-200 shadow-sm shadow-stone-900/[0.03]">
      <table className="w-full text-sm data-table">
        <thead>
          <tr className="bg-stone-50/80 border-b border-stone-200">
            <th className="text-left px-4 py-2.5 font-semibold text-stone-600 text-xs uppercase tracking-wide whitespace-nowrap"></th>
            {headers.map((h, i) => (
              <th key={i} className="text-left px-4 py-2.5 font-semibold text-stone-600 text-xs uppercase tracking-wide whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={`border-b border-stone-100 last:border-b-0 transition-colors ${
                i % 2 === 0 ? 'bg-white' : 'bg-stone-50/40'
              } hover:bg-brand-50/40`}
            >
              <td className={`px-4 py-2.5 whitespace-nowrap ${
                highlightFirst ? 'font-semibold text-stone-800' : 'text-stone-500'
              }`}>
                {row.label}
              </td>
              {row.cells.map((cell, j) => (
                <td key={j} className="px-4 py-2.5 text-stone-700 font-medium">
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
