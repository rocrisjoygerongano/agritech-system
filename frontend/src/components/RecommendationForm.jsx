import { useState, useEffect } from "react";
import api from "../api/axios";

function RecommendationForm({
  onRecommendationAdded,
  editingRecommendation,
  onCancelEdit,
}) {
  const [farms, setFarms] = useState([]);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    farm: "",
    disease_risk: "Low",
    irrigation_needed: false,
    water_amount: "",
    message: "",
  });

  useEffect(() => {
    fetchFarms();
  }, []);

  useEffect(() => {
    if (editingRecommendation) {
      setFormData({
        farm: editingRecommendation.farm || "",
        disease_risk: editingRecommendation.disease_risk || "Low",
        irrigation_needed: editingRecommendation.irrigation_needed || false,
        water_amount: editingRecommendation.water_amount || "",
        message: editingRecommendation.message || "",
      });
    } else {
      setFormData({
        farm: "",
        disease_risk: "Low",
        irrigation_needed: false,
        water_amount: "",
        message: "",
      });
    }
  }, [editingRecommendation]);

  const fetchFarms = async () => {
    try {
      const response = await api.get("farms/");
      setFarms(response.data);
    } catch (error) {
      console.error("Error fetching farms:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingRecommendation) {
        await api.put(`recommendations/${editingRecommendation.id}/`, formData);
        setMessage("Recommendation updated successfully.");
      } else {
        await api.post("recommendations/", formData);
        setMessage("Recommendation added successfully.");
      }

      setFormData({
        farm: "",
        disease_risk: "Low",
        irrigation_needed: false,
        water_amount: "",
        message: "",
      });

      if (onRecommendationAdded) onRecommendationAdded();
      if (onCancelEdit) onCancelEdit();
    } catch (error) {
      console.error(error);
      setMessage("Failed to save recommendation.");
    }
  };

  return (
    <div className="card">
      <h3>
        {editingRecommendation ? "Edit Recommendation" : "Add Recommendation"}
      </h3>

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

        <select
          name="disease_risk"
          value={formData.disease_risk}
          onChange={handleChange}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <input
          type="number"
          step="0.01"
          name="water_amount"
          placeholder="Water Amount"
          value={formData.water_amount}
          onChange={handleChange}
        />

        <label className="checkbox-label">
          <input
            type="checkbox"
            name="irrigation_needed"
            checked={formData.irrigation_needed}
            onChange={handleChange}
          />
          <span>Irrigation Needed</span>
        </label>

        <textarea
          name="message"
          placeholder="Recommendation Message"
          value={formData.message}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingRecommendation ? "Update Recommendation" : "Add Recommendation"}
        </button>

        {editingRecommendation && (
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

export default RecommendationForm;