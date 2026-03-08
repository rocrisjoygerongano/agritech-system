import { useEffect, useState } from "react";
import api from "../api/axios";
import RecommendationForm from "../components/RecommendationForm";

function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState([]);
  const [farms, setFarms] = useState([]);
  const [editingRecommendation, setEditingRecommendation] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [recommendationsResponse, farmsResponse] = await Promise.all([
        api.get("recommendations/"),
        api.get("farms/"),
      ]);

      setRecommendations(recommendationsResponse.data);
      setFarms(farmsResponse.data);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  const getFarmName = (farmId) => {
    const farm = farms.find((item) => Number(item.id) === Number(farmId));
    return farm ? farm.farm_name : `Farm ID ${farmId}`;
  };

  const getRiskClass = (risk) => {
    if (risk === "High") return "badge high";
    if (risk === "Medium") return "badge medium";
    return "badge low";
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this recommendation?");
    if (!confirmed) return;

    try {
      await api.delete(`recommendations/${id}/`);
      fetchAllData();
      if (editingRecommendation && editingRecommendation.id === id) {
        setEditingRecommendation(null);
      }
    } catch (error) {
      console.error("Error deleting recommendation:", error);
    }
  };

  return (
    <div>
      <h1 className="page-title">Recommendations</h1>
      <p className="page-subtitle">
        Add, view, edit, and delete farm recommendations.
      </p>

      <RecommendationForm
        onRecommendationAdded={fetchAllData}
        editingRecommendation={editingRecommendation}
        onCancelEdit={() => setEditingRecommendation(null)}
      />

      <div className="card">
        <h3>Recommendation List</h3>

        {recommendations.length > 0 ? (
          recommendations.map((item) => (
            <div key={item.id} className="list-item">
              <h3>
                {getFarmName(item.farm)}
                <span className={getRiskClass(item.disease_risk)}>
                  {item.disease_risk} Risk
                </span>
              </h3>

              <p><strong>Irrigation Needed:</strong> {item.irrigation_needed ? "Yes" : "No"}</p>
              <p><strong>Water Amount:</strong> {item.water_amount}</p>
              <p><strong>Message:</strong> {item.message}</p>

              <div className="actions">
                <button
                  className="action-btn edit-btn"
                  onClick={() => setEditingRecommendation(item)}
                >
                  Edit
                </button>

                <button
                  className="action-btn delete-btn"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No recommendations found.</p>
        )}
      </div>
    </div>
  );
}

export default RecommendationsPage;