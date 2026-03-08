# Agritech Monitoring System
FarmShield AI is a full-stack web application designed to help farmers monitor environmental conditions and receive automated agricultural recommendations based on sensor data.

The system collects data such as:

- Soil moisture
- Soil temperature
- Air temperature
- Humidity
- Leaf wetness

Based on these readings, the system generates disease risk alerts and irrigation recommendations.

## Tech Stack
- Django REST Framework
- React + Vite
- Axios
- Recharts

## Features
- Farm management
- Sensor readings monitoring
- AI recommendations
- Dashboard analytics
- CRUD operations

## Run Backend

cd backend  
venv\Scripts\activate  
python manage.py runserver

Backend will run at:
http://127.0.0.1:8000

## Run Frontend

cd frontend  
npm install  
npm run dev

Frontend will run at:
http://localhost:5173