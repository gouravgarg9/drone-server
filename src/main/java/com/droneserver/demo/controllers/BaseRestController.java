package com.droneserver.demo.controllers;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.droneserver.demo.dto.DataPoint;
import com.droneserver.demo.dto.DroneInfo;

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

	@GetMapping("/updateSystemInfo")
	public String updateSystemInfo() {

		final Gson gson = new Gson();
		final List<DroneInfo> drones = new ArrayList<>();

		DroneInfo dto1 = new DroneInfo("1", -25, 19, 5, 10, 50, "nkull");
		DroneInfo dto2 = new DroneInfo("2", -35, 149, 5, 10, 50, "bull");
		drones.add(dto1);
		drones.add(dto2);
		
		return gson.toJson(drones);
	}

    @PostMapping("/startMission")
	public String startMission( @RequestParam("points") String points, @RequestParam("droneId") String droneId) {
		log.debug("From Drone ID {} Received Points Data: {}", droneId, points);
		if(points == null || points.trim().length() < 5) {
			return "fail";
		}

        return "ok";
    }

    @PostMapping("/sendCommand")
	public String sendCommand(@RequestParam("droneId") String droneId, @RequestParam("commandCode") String commandCode) {
		log.debug("Received command code {} for Drone ID {}", commandCode, droneId);
		if(commandCode == null || commandCode.trim().length() < 1) {
			return "null";
		}

        return "ok";
    }
    
}
