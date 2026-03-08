import { useEffect, useState } from "react";
import api from "../api/axios";
import FarmForm from "../components/FarmForm";

function FarmsPage() {
  const [farms, setFarms] = useState([]);
  const [editingFarm, setEditingFarm] = useState(null);

  useEffect(() => {
    fetchFarms();
  }, []);

  const fetchFarms = async () => {
    try {
      const response = await api.get("farms/");
      setFarms(response.data);
    } catch (error) {
      console.error("Error fetching farms:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this farm?");
    if (!confirmed) return;

    try {
      await api.delete(`farms/${id}/`);
      fetchFarms();
      if (editingFarm && editingFarm.id === id) {
        setEditingFarm(null);
      }
    } catch (error) {
      console.error("Error deleting farm:", error);
    }
  };

  return (
    <div>
      <h1 className="page-title">Farms</h1>
      <p className="page-subtitle">
        View, add, edit, and delete farm records.
      </p>

      <FarmForm
        onFarmAdded={fetchFarms}
        editingFarm={editingFarm}
        onCancelEdit={() => setEditingFarm(null)}
      />

      <div className="card">
        <h3>Farm List</h3>

        {farms.length > 0 ? (
          farms.map((farm) => (
            <div key={farm.id} className="list-item">
              <h3>{farm.farm_name}</h3>
              <p><strong>Farmer:</strong> {farm.farmer_name}</p>
              <p><strong>Location:</strong> {farm.location}</p>
              <p><strong>Crop Type:</strong> {farm.crop_type}</p>
              <p><strong>Farm Size:</strong> {farm.farm_size} hectares</p>

              <div className="actions">
                <button
                  className="action-btn edit-btn"
                  onClick={() => setEditingFarm(farm)}
                >
                  Edit
                </button>

                <button
                  className="action-btn delete-btn"
                  onClick={() => handleDelete(farm.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No farms found.</p>
        )}
      </div>
    </div>
  );
}

export default FarmsPage;