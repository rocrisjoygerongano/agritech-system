import { useEffect, useState } from "react";
import api from "../api/axios";

function SensorReadingForm({
  onReadingSaved,
  editingReading,
  onCancelEdit,
}) {
  const [farms, setFarms] = useState([]);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    farm: "",
    soil_moisture: "",
    soil_temperature: "",
    air_temperature: "",
    humidity: "",
    leaf_wetness: "",
  });

  useEffect(() => {
    fetchFarms();
  }, []);

  useEffect(() => {
    if (editingReading) {
      setFormData({
        farm: editingReading.farm || "",
        soil_moisture: editingReading.soil_moisture || "",
        soil_temperature: editingReading.soil_temperature || "",
        air_temperature: editingReading.air_temperature || "",
        humidity: editingReading.humidity || "",
        leaf_wetness: editingReading.leaf_wetness || "",
      });
    } else {
      setFormData({
        farm: "",
        soil_moisture: "",
        soil_temperature: "",
        air_temperature: "",
        humidity: "",
        leaf_wetness: "",
      });
    }
  }, [editingReading]);

  const fetchFarms = async () => {
    try {
      const response = await api.get("farms/");
      setFarms(response.data);
    } catch (error) {
      console.error("Error fetching farms:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingReading) {
        await api.put(`readings/${editingReading.id}/`, formData);
        setMessage("Sensor reading updated successfully.");
      } else {
        await api.post("readings/", formData);
        setMessage("Sensor reading added successfully.");
      }

      setFormData({
        farm: "",
        soil_moisture: "",
        soil_temperature: "",
        air_temperature: "",
        humidity: "",
        leaf_wetness: "",
      });

      if (onReadingSaved) onReadingSaved();
      if (onCancelEdit) onCancelEdit();
    } catch (error) {
      console.error(error);
      setMessage("Failed to save sensor reading.");
    }
  };

  return (
    <div className="card">
      <h3>{editingReading ? "Edit Sensor Reading" : "Add Sensor Reading"}</h3>

      <form className="form-grid" onSubmit={handleSubmit}>
        <select
          name="farm"
          value={formData.farm}
          onChange={handleChange}
          required
        >
          <option value="">Select Farm</option>
          {farms.map((farm) => (
            <option key={farm.id} value={farm.id}>
              {farm.farm_name}
            </option>
          ))}
        </select>

        <input
          type="number"
          step="0.01"
          name="soil_moisture"
          placeholder="Soil Moisture"
          value={formData.soil_moisture}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          step="0.01"
          name="soil_temperature"
          placeholder="Soil Temperature"
          value={formData.soil_temperature}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          step="0.01"
          name="air_temperature"
          placeholder="Air Temperature"
          value={formData.air_temperature}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          step="0.01"
          name="humidity"
          placeholder="Humidity"
          value={formData.humidity}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          step="0.01"
          name="leaf_wetness"
          placeholder="Leaf Wetness"
          value={formData.leaf_wetness}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingReading ? "Update Reading" : "Add Reading"}
        </button>

        {editingReading && (
          <button
            type="button"
            className="action-btn delete-btn"
            onClick={onCancelEdit}
          >
            Cancel Edit
          </button>
        )}
      </form>

      {message && <p className="form-message">{message}</p>}
    </div>
  );
}

export default SensorReadingForm;