import { useStore } from '@/store/useStore';
import { ArrowUp, ArrowDown } from 'lucide-react';

export function TransactionLog() {
  const { transactions } = useStore();

  const formatDate = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleString('en-AU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (transactions.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No transactions yet
      </div>
    );
  }

  return (
    <div className="overflow-auto max-h-64">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 sticky top-0">
          <tr>
            <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600">Time</th>
            <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600">Item</th>
            <th className="px-3 py-2 text-center text-xs font-semibold text-gray-600">Action</th>
            <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600">SAN</th>
          </tr>
        </thead>
        <tbody>
          {transactions.slice(0, 50).map((tx, index) => (
            <tr key={tx.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-3 py-2 text-gray-500 whitespace-nowrap">
                {formatDate(tx.timestamp)}
              </td>
              <td className="px-3 py-2 font-medium">{tx.item}</td>
              <td className="px-3 py-2 text-center">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                  tx.action === 'add'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {tx.action === 'add' ? (
                    <ArrowUp className="w-3 h-3" />
                  ) : (
                    <ArrowDown className="w-3 h-3" />
                  )}
                  {tx.volume}
                </span>
              </td>
              <td className="px-3 py-2 text-gray-500 font-mono text-xs">
                {tx.sanNumber || '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
