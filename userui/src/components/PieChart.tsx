import { PieChart, Pie, Cell } from 'recharts';

// Data for the pie chart
const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 200 },
  { name: 'Group C', value: 400 },
  { name: 'Group D', value: 300 },
];

// Colors for each segment
const COLORS = ['#962DFF', '#4A3AFF', '#ACBEFF', '#D7B5FE'];


const CustomPieChart = () => {
  return (
    <PieChart width={400} height={250}>
      {/* First Pie */}
      <Pie
        data={data}
        cx={180}
        cy={110}
        innerRadius={60}
        outerRadius={100}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((_entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default CustomPieChart;
