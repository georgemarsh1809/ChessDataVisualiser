import {
  PieChart as RechartsPieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;

export const PieChart = ({ data, title }) => {
  console.log("🚀 ~ PieChart ~ data:", data);
  if (!data) return;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    return data[index].name;
  };
  return (
    <ResponsiveContainer width={400} height={400}>

      <RechartsPieChart width={300} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <text x={15} y={15} dominantBaseline="central" fill="black" textDecoration="underline">
          <tspan fontSize="25">{title}</tspan>
        </text>

      </RechartsPieChart>
    </ResponsiveContainer>
  );
};
