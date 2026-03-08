import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import FarmsPage from "./pages/FarmsPage";
import SensorReadingsPage from "./pages/SensorReadingsPage";
import RecommendationsPage from "./pages/RecommendationsPage";
import "./App.css";

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="app-layout">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className={`main-content ${sidebarOpen ? "" : "expanded"}`}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/farms" element={<FarmsPage />} />
          <Route path="/readings" element={<SensorReadingsPage />} />
          <Route path="/recommendations" element={<RecommendationsPage />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;