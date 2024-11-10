package com.droneserver.demo.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@RequiredArgsConstructor
public class DataPoint {
	private final String lat;
	private final String lng;
	private final float speed;
	private final float height;
	private final int action; 
}
