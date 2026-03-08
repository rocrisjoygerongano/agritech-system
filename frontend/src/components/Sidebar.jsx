import { Link, useLocation } from "react-router-dom";
import {
  FaSeedling,
  FaHome,
  FaTractor,
  FaChartLine,
  FaBell,
  FaBars,
} from "react-icons/fa";
import "./Sidebar.css";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();

  return (
    <aside className={`sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
      <div className="sidebar-top">
        <button
          className="hamburger-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FaBars />
        </button>

        {sidebarOpen && (
          <div className="sidebar-logo">
            <FaSeedling />
            <span>FarmShield</span>
          </div>
        )}
      </div>

      <nav className="sidebar-links">
        <Link className={location.pathname === "/" ? "active" : ""} to="/">
          <FaHome />
          {sidebarOpen && <span>Dashboard</span>}
        </Link>

        <Link className={location.pathname === "/farms" ? "active" : ""} to="/farms">
          <FaTractor />
          {sidebarOpen && <span>Farms</span>}
        </Link>

        <Link
          className={location.pathname === "/readings" ? "active" : ""}
          to="/readings"
        >
          <FaChartLine />
          {sidebarOpen && <span>Sensor Readings</span>}
        </Link>

        <Link
          className={location.pathname === "/recommendations" ? "active" : ""}
          to="/recommendations"
        >
          <FaBell />
          {sidebarOpen && <span>Recommendations</span>}
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;