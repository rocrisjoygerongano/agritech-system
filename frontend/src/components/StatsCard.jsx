function StatsCard({ icon, title, value }) {
  return (
    <div className="stat-box">
      <div className="stat-icon">{icon}</div>
      <div>
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </div>
  );
}

export default StatsCard;