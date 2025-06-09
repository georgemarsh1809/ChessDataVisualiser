import {
    BarChart as RechartsBarChart,
    Bar,
    Rectangle,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
    const winPercentage = payload[0]?.payload.winPercentage;
    const numberOfGames = payload[0]?.payload.numberOfGames;

    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="label">Games: {numberOfGames}</p>
                <p className="label">Win Percentage: {winPercentage}</p>
            </div>
        );
    }

    return null;
};

export const BarChart = ({ data, dataKey, title }) => {
    return (
        <ResponsiveContainer width="100%" height="90%">
            <RechartsBarChart width={460} height={460} data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                {/* <Legend /> */}
                <Bar
                    dataKey={dataKey}
                    fill="#8884d8"
                    activeBar={<Rectangle fill="pink" stroke="purple" />}
                />
                <text
                    x={100}
                    y={15}
                    dominantBaseline="central"
                    fill="black"
                    textDecoration="underline"
                >
                    <tspan fontSize="25">{title}</tspan>
                </text>
            </RechartsBarChart>
        </ResponsiveContainer>
    );
};
