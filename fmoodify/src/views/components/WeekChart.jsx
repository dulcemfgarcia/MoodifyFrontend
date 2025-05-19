import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const WeekChart = ({ data }) => {
    return (
        <div style={{ width: "100%", maxWidth: "600px", margin: "auto", textAlign: "center" }}>
        
        {/*Si data tiene información, se devuelve el chart con los datos de las emociones semanales del usuario, de lo contrario, se devuelven textos de información para el usuario */}
        {data.length === 0 ? (
            <div style={{ textAlign: "center", color: "white", marginTop: "1rem" }}>
                <p style={{ fontSize: "1.2rem" }}>No recommendations this week.</p>
                <p style={{ fontSize: "1rem", opacity: 0.7 }}> Make a recommendation in Home Section and come back later! </p>
            </div>
        ) : (
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <XAxis dataKey="day" stroke="white" />
                <YAxis hide />
                <Tooltip 
                    cursor={{ fill: "transparent" }} 
                    contentStyle={{
                        backgroundColor: "#1F2421",
                        color: "#ffffff",
                    }}
                    labelStyle={{
                        color: "#cccccc"
                    }}
                />
                <Bar dataKey="value" fill="#DCE1DE" radius={[10, 10, 0, 0]} barSize={50} />
                </BarChart>
            </ResponsiveContainer>
        )}
        </div>
    );
};

export default WeekChart;