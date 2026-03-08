function WeatherCard({ title, value, subtext, className }) {
  return (
    <div className={`weather-card ${className}`}>
      <h4>{title}</h4>
      <p className="weather-value">{value}</p>
      <div className="weather-sub">{subtext}</div>
    </div>
  );
}

export default WeatherCard;