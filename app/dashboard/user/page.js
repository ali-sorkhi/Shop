"use client";
import { useEffect, useState } from "react";
import UserChart from "@/components/user/UserChart";
export default function UserDashboard() {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    fetchChartData();
  }, []);
  const fetchChartData = async () => {
    try {
      const response = await fetch(`${process.env.API}/user/chart`);
      const data = await response.json();
      setChartData(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <p className="lead text-center">User Dashboard</p>
          <UserChart chartData={chartData} />
        </div>
      </div>
    </div>
  );
}
