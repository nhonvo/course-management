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
import { MonthlyReportItem } from "../service/houseFeeService";
import { currencyFormat } from "src/lib/utilities";

type Props = {
    data: MonthlyReportItem[];
    dataKey: string;
    strokeColor: string;
    fillColor: string;
    name: string;
};

const AreaChartComponent: React.FC<Props> = ({
    data,
    dataKey,
    strokeColor,
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
            <YAxis tickFormatter={currencyFormat} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip formatter={currencyFormat} />
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
