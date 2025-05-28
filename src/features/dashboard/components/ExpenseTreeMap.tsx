'use client';

import React from 'react';
import {
    Treemap,
    ResponsiveContainer,
} from 'recharts';

type ExpenseItem = {
    name: string;
    size: number;
};

interface ExpenseTreeMapProps {
    data: ExpenseItem[];
}
export interface ChartProps {
    depth: number;
    x: number;
    y: number;
    width: number;
    height: number;
    name: string;
    size: number;
    index: number;  // add index
}

const COLORS = [
    '#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8',
    '#93c5fd', '#bfdbfe', '#1e40af', '#1e3a8a',
];

const CustomizedContent = (props: ChartProps) => {
    const { depth, x, y, width, height, name, size, index } = props;
    const isLeaf = depth === 1;

    const color = COLORS[index % COLORS.length];
    const textColor = '#fff';

    return (
        <g>
            <rect
                x={x}
                y={y}
                width={width}
                height={height}
                style={{
                    fill: isLeaf ? color : '#e5e7eb',
                    stroke: '#fff',
                    strokeWidth: 1,
                }}
                rx={6}
                ry={6}
            />
            <title>{name} ({size.toLocaleString()})</title>
            {isLeaf && (
                <>
                    <text
                        x={x + 6}
                        y={y + 18}
                        fill={textColor}
                        fontSize={Math.min(12, height / 3)}
                        fontWeight=""
                        style={{ pointerEvents: 'none' }}
                    >
                        {name.length > 15 ? name.slice(0, 12) + '...' : name}
                    </text>
                    <text
                        x={x + 6}
                        y={y + 34}
                        fill={textColor}
                        fontSize={Math.min(10, height / 4)}
                        style={{ pointerEvents: 'none' }}
                    >
                        {size.toLocaleString()}
                    </text>
                </>
            )}
        </g>
    );
};
const ExpenseTreeMap: React.FC<ExpenseTreeMapProps> = ({ data }) => {
    const sortedData = React.useMemo(() => {
        return [...data].sort((a, b) => b.size - a.size);
    }, [data]);

    return (
        <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
                <Treemap
                    data={sortedData}
                    dataKey="size"
                    stroke="#fff"
                    content={<CustomizedContent depth={0} x={0} y={0} width={0} height={0} name={''} size={0} index={0} />}
                />
            </ResponsiveContainer>
        </div>
    );
};

export default ExpenseTreeMap;
