import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import CustomLegend from "./CustomLegend";

const CustomPieChart = ({ data, colors }) => {

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;

      return (
        <div className="bg-white shadow-lg rounded-md px-3 py-2 border border-gray-200">
          <p className="text-xs font-bold text-purple-700 mb-0.5">
            {item.status}
          </p>
          <p className="text-xs text-gray-700">
            Count:{" "}
            <span className="font-semibold text-gray-900">
              {item.count}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>

        {/* PIE CHART */}
        <Pie
          data={data}
          dataKey="count"
          nameKey="status"
          cx="50%"
          cy="50%"
          innerRadius={85}
          outerRadius={122}
          paddingAngle={2}
          label={({ payload }) => payload.count}
        >
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={colors[index % colors.length]}
              stroke="#fff"
              strokeWidth={2}
            />
          ))}
        </Pie>

        {/* TOOLTIP */}
        <Tooltip content={<CustomTooltip />} />

        {/* LEGEND */}
        <Legend
          content={<CustomLegend />}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
