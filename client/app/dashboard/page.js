"use client";
import React, { useState, useRef, useMemo, useEffect } from "react";
import axios from "axios";
import { FiUpload, FiFileText } from "react-icons/fi";
import { MdTableChart } from "react-icons/md";
import { Chart, registerables } from "chart.js";
import {
  getUniqueColumns,
  filterData,
  calculateMetrics,
  groupData,
} from "../utils/dataprocessor";
import AiInsights from "../_components/AiInsights";

Chart.register(...registerables);

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);

  const [activeTab, setActiveTab] = useState("metrics");
  const [selectedCol, setSelectedCol] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  const [chartType, setChartType] = useState("bar");

  const inputRef = useRef(null);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped?.name.endsWith(".csv")) setFile(dropped);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/upload",
        formData,
      );
      const parsed = response.data;
      setData(parsed);
      setSelectedCol(getUniqueColumns(parsed)[0] ?? "");
      setActiveTab("metrics");
      setFilterQuery("");
    } catch (err) {
      console.error("Upload error", err);
    } finally {
      setLoading(false);
    }
  };

  const columns = useMemo(() => getUniqueColumns(data), [data]);

  const filtered = useMemo(
    () => filterData(data, selectedCol, filterQuery),
    [data, selectedCol, filterQuery],
  );

  const metrics = useMemo(
    () =>
      filtered.length > 0 ? calculateMetrics(filtered, selectedCol) : null,
    [filtered, selectedCol],
  );

  const grouped = useMemo(
    () => (filtered.length > 0 ? groupData(filtered, selectedCol) : {}),
    [filtered, selectedCol],
  );

  // Build chart whenever tab, chartType, column, or filtered data changes
  useEffect(() => {
    if (activeTab !== "charts" || !chartRef.current) return;

    // Destroy previous instance
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
      chartInstanceRef.current = null;
    }

    const ctx = chartRef.current.getContext("2d");

    let labels = [];
    let dataset = [];

    if (chartType === "bar") {
      const groups = groupData(filtered, selectedCol);
      const sorted = Object.entries(groups).sort(
        ([, a], [, b]) => b.length - a.length,
      );
      labels = sorted.map(([key]) => key);
      dataset = sorted.map(([, rows]) => rows.length);
    } else {
      // Line chart — numeric values in row order
      labels = filtered.map((_, i) => `#${i + 1}`);
      dataset = filtered.map((row) => parseFloat(row[selectedCol]) || 0);
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: chartType,
      data: {
        labels,
        datasets: [
          {
            label: selectedCol,
            data: dataset,
            backgroundColor:
              chartType === "bar"
                ? "rgba(17, 24, 39, 0.08)"
                : "rgba(17, 24, 39, 0.05)",
            borderColor: "rgba(17, 24, 39, 0.75)",
            borderWidth: chartType === "bar" ? 1.5 : 2,
            borderRadius: chartType === "bar" ? 6 : 0,
            pointRadius: chartType === "line" ? 3 : 0,
            pointBackgroundColor: "rgba(17, 24, 39, 0.75)",
            tension: 0.35,
            fill: chartType === "line",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#111827",
            titleColor: "#f9fafb",
            bodyColor: "#d1d5db",
            padding: 10,
            cornerRadius: 8,
            displayColors: false,
          },
        },
        scales: {
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: {
              color: "#9ca3af",
              font: { size: 11 },
              maxRotation: 30,
              maxTicksLimit: 12,
            },
          },
          y: {
            grid: { color: "rgba(0,0,0,0.05)", drawBorder: false },
            border: { display: false, dash: [4, 4] },
            ticks: {
              color: "#9ca3af",
              font: { size: 11 },
              maxTicksLimit: 6,
            },
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [activeTab, chartType, filtered, selectedCol]);

  const uploadStats =
    data.length > 0
      ? [
          { label: "Rows", value: data.length },
          { label: "Columns", value: columns.length },
          { label: "File", value: file?.name ?? "—" },
        ]
      : [];

  const TABS = ["metrics", "filtered data", "charts"];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-xl font-medium text-gray-900">CSV data viewer</h1>
          <p className="text-sm text-gray-500 mt-1">
            Upload a CSV file to parse, filter, and analyse
          </p>
        </div>

        {/* Upload card */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <div
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              dragging
                ? "border-gray-400 bg-gray-50"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <FiUpload className="text-gray-500" style={{ fontSize: 16 }} />
            </div>
            <p className="text-sm font-medium text-gray-800">
              Drop your CSV file here
            </p>
            <p className="text-xs text-gray-400 mt-1">or click to browse</p>
            <input
              ref={inputRef}
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {file && (
            <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2.5">
                <FiFileText
                  className="text-gray-400 shrink-0"
                  style={{ fontSize: 14 }}
                />
                <span className="text-sm text-gray-800">{file.name}</span>
              </div>
              <span className="text-xs text-gray-400">
                {(file.size / 1024).toFixed(1)} KB
              </span>
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={handleUpload}
              disabled={!file || loading}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
            >
              <FiUpload style={{ fontSize: 14 }} />
              {loading ? "Parsing…" : "Upload & parse"}
            </button>
          </div>
        </div>

        {/* Upload stats */}
        {uploadStats.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            {uploadStats.map(({ label, value }) => (
              <div key={label} className="bg-gray-100 rounded-lg px-4 py-3">
                <p className="text-xs text-gray-500 mb-1">{label}</p>
                <p className="text-lg font-medium text-gray-900 truncate">
                  {value}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Analysis panel */}
        {data.length > 0 && (
          <div className="space-y-4">
            {/* Controls */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
              <p className="text-sm font-medium text-gray-800">
                Analysis settings
              </p>
              <AiInsights filtered={filtered} />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 block mb-1.5">
                    Analysis column
                  </label>
                  <select
                    value={selectedCol}
                    onChange={(e) => setSelectedCol(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-800 focus:outline-none focus:border-gray-400"
                  >
                    {columns.map((col) => (
                      <option key={col} value={col}>
                        {col}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1.5">
                    Filter query
                  </label>
                  <input
                    type="text"
                    placeholder={`Search in "${selectedCol}"…`}
                    value={filterQuery}
                    onChange={(e) => setFilterQuery(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-400"
                  />
                </div>
              </div>

              {filterQuery && (
                <p className="text-xs text-gray-400">
                  {filtered.length} of {data.length} rows match
                </p>
              )}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-xs px-4 py-1.5 rounded-md capitalize transition-colors ${
                    activeTab === tab
                      ? "bg-white text-gray-900 font-medium shadow-sm border border-gray-200"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab: Metrics */}
            {activeTab === "metrics" && metrics && (
              <div className="grid grid-cols-5 gap-3">
                {[
                  ["Count", metrics.count],
                  ["Sum", metrics.sum],
                  ["Average", metrics.avg],
                  ["Min", metrics.min],
                  ["Max", metrics.max],
                ].map(([label, value]) => (
                  <div key={label} className="bg-gray-100 rounded-lg px-4 py-3">
                    <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">
                      {label}
                    </p>
                    <p className="text-lg font-medium text-gray-900">{value}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Tab: Filtered data */}
            {activeTab === "filtered data" && (
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        {columns.map((col) => (
                          <th
                            key={col}
                            className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 whitespace-nowrap"
                          >
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((row, i) => (
                        <tr
                          key={i}
                          className="border-b border-gray-100 hover:bg-gray-50 last:border-0"
                        >
                          {columns.map((col, j) => (
                            <td key={j} className="px-4 py-2.5 text-gray-800">
                              {row[col]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {filtered.length === 0 && (
                  <p className="text-sm text-gray-400 text-center py-10">
                    No rows match your filter.
                  </p>
                )}
              </div>
            )}

            {/* Tab: Charts */}
            {activeTab === "charts" && (
              <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
                {/* Chart type toggle */}
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-800">
                    {chartType === "bar"
                      ? `Group counts — ${selectedCol}`
                      : `Value trend — ${selectedCol}`}
                  </p>
                  <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                    {["bar", "line"].map((type) => (
                      <button
                        key={type}
                        onClick={() => setChartType(type)}
                        className={`text-xs px-3 py-1.5 rounded-md capitalize transition-colors ${
                          chartType === type
                            ? "bg-white text-gray-900 font-medium border border-gray-200"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        {type} chart
                      </button>
                    ))}
                  </div>
                </div>

                {/* Canvas */}
                <div className="h-72">
                  <canvas ref={chartRef} />
                </div>

                <p className="text-xs text-gray-400">
                  {chartType === "bar"
                    ? "Showing row counts per unique value in the selected column."
                    : `Showing numeric values of "${selectedCol}" across ${filtered.length} rows in order.`}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Empty state */}
        {data.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <MdTableChart
              className="mb-3 opacity-40"
              style={{ fontSize: 32 }}
            />
            <p className="text-sm">No data yet — upload a CSV to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}
