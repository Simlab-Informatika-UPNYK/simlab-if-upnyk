import { useState, useMemo } from 'react';

const MyTable = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const columns = useMemo(() => [
    { key: 'nama', label: 'Nama' },
    { key: 'nim', label: 'NIM' },
    { key: 'email', label: 'Email' },
    { key: 'no_hp', label: 'No. HP' },
    { key: 'angkatan', label: 'Angkatan' },
    { key: 'jurusan', label: 'Jurusan' },
    { key: 'status', label: 'Status' },
  ], []);

  const filteredData = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return data.filter(item =>
      Object.values(item).some(value =>
        value.toString().toLowerCase().includes(term)
      )
    );
  }, [data, searchTerm]);

  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;

    const sorted = [...filteredData];
    sorted.sort((a, b) => {
      const aValue = a[sortKey].toString().toLowerCase();
      const bValue = b[sortKey].toString().toLowerCase();
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [filteredData, sortKey, sortOrder]);

  const handleSort = (key) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Cari..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            {columns.map(column => (
              <th
                key={column.key}
                onClick={() => handleSort(column.key)}
                style={{ cursor: 'pointer' }}
              >
                {column.label}
                {sortKey === column.key && (
                  <span>{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index}>
              {columns.map(column => (
                <td key={column.key}>{item[column.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyTable;