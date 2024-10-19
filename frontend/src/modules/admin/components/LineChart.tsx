
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'Jan',
        uv: 400,
    },
    {
        name: 'Feb',
        uv: 300,
    },
    {
        name: 'Mar',
        uv: 200,
    },
    {
        name: 'Apr',
        uv: 278,
    },
    {
        name: 'May',
        uv: 189,
    },
    {
        name: 'Jun',
        uv: 250,
    },
    {
        name: 'Jul',
        uv: 349,
    },
    {
        name: 'Aug',
        uv: 300,
    },
    {
        name: 'Sep',
        uv: 320,
    },
];

const LineChart = () => {
    return (
        <ResponsiveContainer width="100%" height={280}>
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
