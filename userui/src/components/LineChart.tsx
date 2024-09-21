import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Jan',
    uv: 4000,
  },
  {
    name: 'Feb',
    uv: 3000,
  },
  {
    name: 'Mar',
    uv: 2000,
  },
  {
    name: 'Apr',
    uv: 2780,
  },
  {
    name: 'May',
    uv: 1890,
  },
  {
    name: 'Jun',
    uv: 2500,
  },
  {
    name: 'Jul',
    uv: 3490,
  },
  {
    name: 'Aug',
    uv: 3000,
  },
  {
    name: 'Sep',
    uv: 3200,
  },
];

const LineChart = () => {
  return (
    <ResponsiveContainer width="100%" height={275}>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area 
          type="monotone" 
          dataKey="uv" 
          stroke="#5246e5"  // Updated stroke color to blue
          fill="rgba(82, 70, 229, 0.2)"  // Updated fill color to a light blue with transparency
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
