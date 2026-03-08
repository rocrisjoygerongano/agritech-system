import { useEffect, useState } from "react";
import api from "../api/axios";

function FarmForm({ onFarmAdded, editingFarm, onCancelEdit }) {
  const [formData, setFormData] = useState({
    farmer_name: "",
    farm_name: "",
    location: "",
    crop_type: "",
    farm_size: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (editingFarm) {
      setFormData({
        farmer_name: editingFarm.farmer_name || "",
        farm_name: editingFarm.farm_name || "",
        location: editingFarm.location || "",
        crop_type: editingFarm.crop_type || "",
        farm_size: editingFarm.farm_size || "",
      });
    } else {
      setFormData({
        farmer_name: "",
        farm_name: "",
        location: "",
        crop_type: "",
        farm_size: "",
      });
    }
  }, [editingFarm]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingFarm) {
        await api.put(`farms/${editingFarm.id}/`, formData);
        setMessage("Farm updated successfully.");
      } else {
        await api.post("farms/", formData);
        setMessage("Farm added successfully.");
      }

      setFormData({
        farmer_name: "",
        farm_name: "",
        location: "",
        crop_type: "",
        farm_size: "",
      });

      if (onFarmAdded) onFarmAdded();
      if (onCancelEdit) onCancelEdit();
    } catch (error) {
      console.error(error);
      setMessage("Failed to save farm.");
    }
  };

  return (
    <div className="card">
      <h3>{editingFarm ? "Edit Farm" : "Add Farm"}</h3>

      <form className="form-grid" onSubmit={handleSubmit}>
        <input
          type="text"
          name="farmer_name"
          placeholder="Farmer Name"
          value={formData.farmer_name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="farm_name"
          placeholder="Farm Name"
          value={formData.farm_name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="crop_type"
          placeholder="Crop Type"
          value={formData.crop_type}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          step="0.01"
          name="farm_size"
          placeholder="Farm Size"
          value={formData.farm_size}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingFarm ? "Update Farm" : "Add Farm"}
        </button>

        {editingFarm && (
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

export default FarmForm;