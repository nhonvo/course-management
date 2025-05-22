import React from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

type Props = {
    data: any[];
    dataKey: string;
    strokeColor: string;
    fillColor: string;
    name: string;
};

const currencyFormatter = (value: number) =>
    value.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
        maximumFractionDigits: 0,
    });

const AreaChartComponent: React.FC<Props> = ({
    data,
    dataKey,
    strokeColor,
    fillColor,
    name,
}) => (
    <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
                <linearGradient id={`color${name.replace(/\s/g, "")}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={strokeColor} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
                </linearGradient>
            </defs>
            <XAxis dataKey="date" />
            <YAxis tickFormatter={currencyFormatter} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip formatter={currencyFormatter} />
            <Area
                type="monotone"
                dataKey={dataKey}
                stroke={strokeColor}
                fill={`url(#color${name.replace(/\s/g, "")})`}
                name={name}
            />
        </AreaChart>
    </ResponsiveContainer>
);

export default AreaChartComponent;
