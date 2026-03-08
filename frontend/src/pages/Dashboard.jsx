import { useEffect, useState } from "react";
import api from "../api/axios";
import StatsCard from "../components/StatsCard";
import WeatherCard from "../components/WeatherCard";
import { FaTractor, FaBell, FaDatabase } from "react-icons/fa";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

function Dashboard() {
  const [farms, setFarms] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [readings, setReadings] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const farmsResponse = await api.get("farms/");
      const recommendationsResponse = await api.get("recommendations/");
      const readingsResponse = await api.get("readings/");

      setFarms(farmsResponse.data);
      setRecommendations(recommendationsResponse.data);
      setReadings(readingsResponse.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const latestReading = readings.length > 0 ? readings[readings.length - 1] : null;

  const chartData = readings.map((reading) => ({
    id: reading.id,
    humidity: Number(reading.humidity),
    soil_moisture: Number(reading.soil_moisture),
    air_temperature: Number(reading.air_temperature),
  }));

  return (
    <div>
      <h1 className="page-title">FarmShield AI Dashboard</h1>
      <p className="page-subtitle">
        Monitor farms, environmental conditions, and recommendations in one place.
      </p>

      <div className="grid">
        <StatsCard icon={<FaTractor />} title="Total Farms" value={farms.length} />
        <StatsCard icon={<FaBell />} title="Recommendations" value={recommendations.length} />
        <StatsCard icon={<FaDatabase />} title="Sensor Readings" value={readings.length} />
      </div>

      <div className="card">
        <h3>Latest Field Conditions</h3>

        {latestReading ? (
          <div className="weather-grid">
            <WeatherCard
              title="Humidity"
              value={`${latestReading.humidity}%`}
              subtext="Latest recorded humidity"
              className="weather-blue"
            />
            <WeatherCard
              title="Soil Moisture"
              value={`${latestReading.soil_moisture}`}
              subtext="Latest soil moisture level"
              className="weather-green"
            />
            <WeatherCard
              title="Air Temperature"
              value={`${latestReading.air_temperature}°C`}
              subtext="Latest air temperature"
              className="weather-red"
            />
            <WeatherCard
              title="Leaf Wetness"
              value={`${latestReading.leaf_wetness}`}
              subtext="Latest leaf wetness status"
              className="weather-purple"
            />
          </div>
        ) : (
          <p>No sensor readings available yet.</p>
        )}
      </div>

      <div className="card">
        <h3>Environmental Trends</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="humidity" stroke="#2563eb" />
              <Line type="monotone" dataKey="soil_moisture" stroke="#16a34a" />
              <Line type="monotone" dataKey="air_temperature" stroke="#dc2626" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;