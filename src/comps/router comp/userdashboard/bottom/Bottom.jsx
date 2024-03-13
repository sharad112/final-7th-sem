import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Bottom = () => {

    const data = [
        { name: 'A', value: 10, count: 5 },
        { name: 'B', value: 20, count: 7 },
        { name: 'C', value: 15, count: 3 },
        { name: 'D', value: 25, count: 9 },
    ];


    return (
        <div>
            <div className="bottom_left">
                <ScatterChart
                    width={500}
                    height={400}
                    margin={{
                        top: 20, right: 20, bottom: 20, left: 20,
                    }}
                >
                    <CartesianGrid />
                    <XAxis type="number" dataKey="value" name="Value" unit="units" />
                    <YAxis type="number" dataKey="count" name="Count" unit="counts" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Legend />
                    <Scatter name="Data" data={data} fill="#8884d8" />
                </ScatterChart>
            </div>
        </div>
    )
}

export default Bottom

