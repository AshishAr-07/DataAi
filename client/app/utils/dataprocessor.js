// Extract Unique columns

export const getUniqueColumns = (data) => {
  return data.length > 0 ? Object.keys(data[0]) : [];
};

// Filter Data
export const filterData = (data, column, query) => {
  if (!query) return data;
  return data.filter((row) =>
    row[column].toString().toLowerCase().includes(query.toLowerCase()),
  );
};

// Calculate metrics
export const calculateMetrics = (data, column) => {
  const values = data
    .map((row) => parseFloat(row[column]))
    .filter((val) => !isNaN(val));

  const sum = values.reduce((acc, val) => acc + val, 0);
  const avg = values.length > 0 ? sum / values.length : 0;

  return {
    count: data.length,
    sum: sum.toFixed(2),
    avg: avg.toFixed(2),
    min: values.length > 0 ? Math.min(...values).toFixed(2) : "N/A",
    max: values.length > 0 ? Math.max(...values).toFixed(2) : "N/A",
  };
};

// Group Data
export const groupData = (data, column) => {
  return data.reduce((group, row) => {
    const value = row[column] || "Undefined";
    if (!group[value]) group[value] = [];
    group[value].push(row);
    return group;
    {
    }
  });
};
