package com.droneserver.demo.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Component
public class ConfigReader {

    // @Value("${app.drone.video-ws-endpoint}")
    private String videoWsEndpoint = "/videofeed";

    // @Value("${app.drone.video-server-port}")
    private int videoServerPort = 1313;

    // @Value("${app.drone.drone-id-length}")
    private int droneIdLength = 1;

}