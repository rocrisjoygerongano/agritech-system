import { useEffect, useState } from "react";
import api from "../api/axios";
import SensorReadingForm from "../components/SensorReadingForm";

function SensorReadingsPage() {
  const [readings, setReadings] = useState([]);
  const [farms, setFarms] = useState([]);
  const [editingReading, setEditingReading] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [readingsResponse, farmsResponse] = await Promise.all([
        api.get("readings/"),
        api.get("farms/"),
      ]);

      setReadings(readingsResponse.data);
      setFarms(farmsResponse.data);
    } catch (error) {
      console.error("Error fetching sensor readings:", error);
    }
  };

  const getFarmName = (farmId) => {
    const farm = farms.find((item) => Number(item.id) === Number(farmId));
    return farm ? farm.farm_name : `Farm ID ${farmId}`;
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this sensor reading?");
    if (!confirmed) return;

    try {
      await api.delete(`readings/${id}/`);
      fetchAllData();
      if (editingReading && editingReading.id === id) {
        setEditingReading(null);
      }
    } catch (error) {
      console.error("Error deleting sensor reading:", error);
    }
  };

  return (
    <div>
      <h1 className="page-title">Sensor Readings</h1>
      <p className="page-subtitle">
        Add, view, edit, and delete environmental monitoring records.
      </p>

      <SensorReadingForm
        onReadingSaved={fetchAllData}
        editingReading={editingReading}
        onCancelEdit={() => setEditingReading(null)}
      />

      <div className="card">
        <h3>Sensor Reading List</h3>

        {readings.length > 0 ? (
          readings.map((reading) => (
            <div key={reading.id} className="list-item">
              <h3>{getFarmName(reading.farm)}</h3>
              <p><strong>Soil Moisture:</strong> {reading.soil_moisture}</p>
              <p><strong>Soil Temperature:</strong> {reading.soil_temperature}</p>
              <p><strong>Air Temperature:</strong> {reading.air_temperature}</p>
              <p><strong>Humidity:</strong> {reading.humidity}</p>
              <p><strong>Leaf Wetness:</strong> {reading.leaf_wetness}</p>

              <div className="actions">
                <button
                  className="action-btn edit-btn"
                  onClick={() => setEditingReading(reading)}
                >
                  Edit
                </button>

                <button
                  className="action-btn delete-btn"
                  onClick={() => handleDelete(reading.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No sensor readings found.</p>
        )}
      </div>
    </div>
  );
}

export default SensorReadingsPage;