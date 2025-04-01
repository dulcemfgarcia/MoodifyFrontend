import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const WeekChart = ({ data }) => {
    return (
        <div style={{ width: "100%", maxWidth: "600px", margin: "auto", textAlign: "center" }}>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <XAxis dataKey="day" stroke="white" />
                <YAxis hide />
                <Tooltip cursor={{ fill: "transparent" }} />
                <Bar dataKey="value" fill="#DCE1DE" radius={[10, 10, 0, 0]} barSize={50} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default WeekChart;