# 🚁 Drone Control Center Web Application

A **real-time web-based control center** for managing and monitoring multiple **Unmanned Aerial Vehicles (UAVs)**. This system provides seamless communication, live tracking, mission planning, and dynamic sensor monitoring with an intuitive UI.

---

## ✨ Key Features

### 📹 Real-Time Control & Monitoring
- 🔴 **Live Video Feed** (via WebSockets & UDP)
- 🎮 Remote UAV Control with unique drone IDs
- 🗺️ **Live Location Tracking** with Google Maps
- 🔧 Drone State Info:
  - 🚀 Altitude
  - 💨 Speed (Horizontal & Vertical)
  - 🔋 Battery Voltage
  - 📡 Connection Status

### 📍 Mission Planning
- Click-to-drop **waypoints** directly on the map.
- Upload and execute multi-point **autonomous drone missions**.

### 📊 Real-Time Sensor Dashboard
- 🌡️ **Temperature & Humidity** (DHT11)
- ☁️ **Gas Levels & Air Quality** (MQ-2)
- 📏 **Obstacle Detection** (Ultrasonic Sensor)
- 📈 **Live Graphs** per drone for all sensor data.

### 📱 Mobile-Responsive UI
- Game-controller-like interface on mobile for easy drone navigation.
- Separate mobile and desktop stylesheets for optimized experience.

---

## 🧩 System Architecture

| Layer         | Tech Stack |
|---------------|------------|
| **Backend**   | Spring Boot, Java, Gradle |
| **Frontend**  | HTML, CSS (Desktop + Mobile UI), JavaScript |
| **Data Layer**| Protocol Buffers (Protobuf) |
| **Hosting**   | Google Cloud Platform (VM Instance) |
| **Streaming** | UDP (Video Feed), WebSockets (Commands & Sensor Data) |
| **Maps**      | Google Maps API for tracking & mission planning |

---

## 🔌 REST API Endpoints

| Method | Endpoint              | Description                          |
|--------|-----------------------|--------------------------------------|
| GET    | `/UpdateSystemInfo`   | Get status of all connected drones   |
| POST   | `/StartMission`       | Send list of waypoints to a drone    |
| POST   | `/SendCommand`        | Send direct command to a specific drone |

---

## 🚀 Quick Start

### 1. Clone the repository:
```bash
git clone https://github.com/gouravgarg9/drone-server.git
cd drone-server
```

### 2. Build the project:
```bash
./gradlew clean build
```

### 3. Run the server:
```bash
java -jar ./build/libs/demo-0.0.1-SNAPSHOT.jar
```

---

## 🔗 Related Repositories

- 🧠 **Raspberry Pi Sensor & Stream Integration**  
  ➤ raspi-app: https://github.com/gouravgarg9/raspi-app

---

## 📌 Notes

- Ensure the frontend (HTML/CSS/JS) is properly served for mobile-optimized view.
- All sensor data and drone video streams are handled via WebSocket & UDP.
- Works best on GCP-hosted environments with dynamic scaling enabled for multiple drones.
