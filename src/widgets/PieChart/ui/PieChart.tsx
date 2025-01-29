import React from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    ChartData,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels, { Context } from 'chartjs-plugin-datalabels';
import autocolors from 'chartjs-plugin-autocolors';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels, autocolors);

const OPTIONS = {
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            enabled: false,
        },
        datalabels: {
            display: true,
            color: '#fff',
            formatter: (value: number, context: Context) =>
                context.chart.data.labels?.[context.dataIndex],
            font: {
                size: 20,
                weight: 700,
            },
        },
        autocolors: {
            mode: 'data' as const,
        },
    },
};

export function PieChart({
    data,
}: {
    data: ChartData<'pie', number[], unknown>;
}) {
    return (
        <div>
            <Pie data={data} options={OPTIONS} />
        </div>
    );
}
