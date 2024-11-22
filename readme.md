# Drone Control Center Web Application

## Overview
A **web-based control center** application for managing and monitoring **Unmanned Aerial Vehicles (UAVs)** in real-time. The application leverages modern technologies to provide seamless communication, efficient data transfer, and robust functionality for drone control and mission planning.

---

## Features
### Web Application Functionalities:
- Real-time **Live Video Feed** using Web-Sockets.
- Control center for **Remote UAV Management**.
- Access and manage all UAVs connected to the server.
- **Live Location Tracking** with Google Maps API integration.
- Comprehensive **Drone State Information**, including:
  - Altitude
  - Speed (Horizontal & Vertical)
  - Battery Voltage
  - Status
- **Mission Planning**: Drop pins on the map to define drone missions.

### Core Architecture:
- Built with **Spring Boot** and **Gradle**.
- Hosted on a **Google Cloud Platform (GCP)** Virtual Machine (VM).
- Efficient communication via **Google Protobuf**.
- Supports Web-Socket communication and UDP for video feed transfer.

---

## REST API Endpoints
1. **GET** `/UpdateSystemInfo`:  
   Retrieves the live status of all connected drones.
   
2. **POST** `/StartMission`:  
   Accepts an array of coordinates to plan a drone mission.

3. **POST** `/SendCommand`:  
   Accepts command inputs from the client for a specific drone.

---

## Technology Stack
- **Backend**: Spring Boot, Java, Gradle.
- **Frontend**: HTML, CSS, JavaScript (custom static assets for UI).
- **Protocol Buffers (Protobuf)**: For efficient data serialization.
- **Google Cloud Platform (GCP)**: Hosting and VM instance management.
- **Web-Sockets**: For real-time communication.
- **Google Maps API**: Location tracking and mission planning.

---

## Folder Structure

- **Backend Code**: Located under `src/main/java`.
- **Frontend Assets**: Stored in `src/main/resources/static`.
- **Configuration Files**: Includes `application.properties`, `application.yaml`.

---

### Steps to Run Locally:
1. Clone the repository:
```bash
git clone https://github.com/gouravgarg9/drone-server.git
cd drone-server
```

2. Build the repository:
```bash
./gradlew clean build
```

3. Run the Jar file:
```bash
java -jar .\build\libs\demo-0.0.1-SNAPSHOT.jar
```
