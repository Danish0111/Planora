import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CustomBarChart = ({ data }) => {
  const getBarColor = (priority) => {
    switch (priority) {
      case "Low":
        return "#00BC7D";
      case "Medium":
        return "#FE9900";
      case "High":
        return "#FF1F57";
      default:
        return "#00BC7D";
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
          <p className="text-xs font-semibold text-purple-800 mb-1">
            {payload[0].payload.priority}
          </p>
          <p className="text-sm text-gray-600">
            Count:{" "}
            <span className="text-sm font-medium text-gray-900">
              {payload[0].payload.count}
            </span>
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 25, left: 10, bottom: 10 }}
      >
        {/* SAME LINES YOU WANT */}
        <CartesianGrid strokeDasharray="none" />

        {/* X Axis with lines */}
        <XAxis
          dataKey="priority"
          tick={{ fontSize: 12, fill: "#555" }}
          stroke="#ccc"
          tickLine={true}
        />

        {/* Y Axis with lines */}
        <YAxis
          tick={{ fontSize: 12, fill: "#555" }}
          stroke="#ccc"
          tickLine={true}
        />

        <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />

        {/* Bars with responsiveness improvements */}
        <Bar
          dataKey="count"
          radius={[10, 10, 0, 0]}
          maxBarSize={80}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={getBarColor(entry.priority)}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
