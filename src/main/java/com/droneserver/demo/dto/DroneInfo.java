package com.droneserver.demo.dto;

import lombok.RequiredArgsConstructor;
import lombok.ToString;

@ToString
@RequiredArgsConstructor
public class DroneInfo {
	private final String id;
	private final double lattitude;
	private final double longitude;
	private final double speed;
	private final double alt;
	private final double battery;
	private final String state;
	private final int mq135;
	private final int mq2;
	private final float distance;

}
