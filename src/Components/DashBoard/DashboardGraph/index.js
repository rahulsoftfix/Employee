"use client";
import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart,
  Area,
  Line,
} from "recharts";

const data = [
  {
    name: "Free Trail",
    Subscriptions: 2780,
  },
  {
    name: "Basic",
    Subscriptions: 4000,
  },
  {
    name: "Business",
    Subscriptions: 3000,
  },
  {
    name: "Enterprise",
    Subscriptions: 2000,
  },
];
const data2 = [
  {
    name: "FY 20-21",
    Basic: 2780,
    Business: 3908,
    Enterprise: 2000,
  },
  {
    name: "FY 21-22",
    Basic: 4800,
    Business: 2400,
    Enterprise: 2900,
  },
  {
    name: "FY  22-23",
    Basic: 3000,
    Business: 6398,
    Enterprise: 3510,
  },
  {
    name: "FY  23-24",
    Basic: 8000,
    Business: 4800,
    Enterprise: 7590,
  },
  {
    name: "FY  24-25",
    Basic: 4000,
    Business: 6290,
    Enterprise: 9800,
  },
];

const DashboardGraph = () => {
  return (
    <>
      <div className="row my-3">
        <div className="col-12">
          <div className="card-body">
            <h4 className="card-sub-title">SUBSCRIBERS</h4>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart
              width={500}
              height={400}
              data={data}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name"></XAxis>
              <YAxis
                label={{
                  value: "SUBSCRIPTIONS",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />

              <Bar dataKey="Subscriptions" fill="#003D92" barSize={20} />
              <Line type="monotone" dataKey="Subscriptions" stroke="#FEAA16" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="col-12">
          <div className="card-body">
            <h4 className="card-sub-title">REVENUE</h4>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              width={100}
              height={40}
              data={data2}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name" />
              <YAxis
                label={{
                  value: "INR",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="Business"
                fill="#8884d8"
                stroke="#8884d8"
              />
              <Bar dataKey="Basic" fill="#003D92" />
              <Bar dataKey="Business" fill="#FE0000" />
              <Bar dataKey="Enterprise" fill="#FEAA15" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default DashboardGraph;
