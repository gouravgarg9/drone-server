package com.droneserver.demo.controllers;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.droneserver.demo.dto.DataPoint;
import com.droneserver.demo.dto.DroneInfo;
import com.droneserver.demo.service.ControlManager;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class BaseRestController {

	private final ControlManager controlManager;

	@GetMapping("/updateSystemInfo")
	public String updateSystemInfo() {

		final Gson gson = new Gson();
		final List<DroneInfo> drones = controlManager.getDroneStatusAll();
		// final List<DroneInfo> drones = new ArrayList<>();
		drones.add(new DroneInfo("3", 20, 30, 10, 10, 10, "MOCK1", 141, 11, 101, 30, 100));
		drones.add(new DroneInfo("4", 10, 50, 15, 15, 90, "MOCK2", 111, 41, 151, 70, 160));
		return gson.toJson(drones);
	}

    @PostMapping("/startMission")
	public String startMission( @RequestParam("points") String points, @RequestParam("droneId") String droneId) {
		log.debug("From Drone ID {} Received Points Data: {}", droneId, points);
		if(points == null || points.trim().length() < 5) {
			return "fail";
		}

        final Gson gson = new Gson();
		final List<DataPoint> deserializedPoints = new ArrayList<>();

		for (Object obj : gson.fromJson(points, List.class)) {
			deserializedPoints.add( gson.fromJson(obj.toString(), DataPoint.class));
		}

		controlManager.sendMissionDataToDrone(droneId, deserializedPoints);

        return "ok";
    }

    @PostMapping("/sendCommand")
	public String sendCommand(@RequestParam("droneId") String droneId, @RequestParam("commandCode") String commandCode) {
		log.debug("Received command code {} for Drone ID {}", commandCode, droneId);
		if(commandCode == null || commandCode.trim().length() < 1) {
			return "null";
		}

		controlManager.sendMessageFromUserIdToDrone(droneId, Integer.parseInt(commandCode));

        return "ok";
    }
    
}
