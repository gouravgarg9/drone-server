package com.droneserver.demo.controllers;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.droneserver.demo.configuration.ConfigReader;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
public class BaseController {

    private final ConfigReader configurations;

    @GetMapping("/")
    public String indexPage(Model model) {
		
		model.addAttribute("publicIp", getPublicIpAddress());
		model.addAttribute("defaultSpeed", configurations.getDefaultSpeed());
		model.addAttribute("defaultAltitude", configurations.getDefaultAltitude());
		model.addAttribute("videoEndpoint", configurations.getVideoWsEndpoint());
        model.addAttribute("googleApiKey", configurations.getGoogleApiKey());
        
        return "index";
    }

    @GetMapping("/video/{droneId}")
    public String getVideoFeed(Model model, @PathVariable("droneId") String droneId) {
        model.addAttribute("publicIp", getPublicIpAddress());
        model.addAttribute("droneId", droneId);
        model.addAttribute("hostPort", configurations.getPort());
        model.addAttribute("videoEndpoint", configurations.getVideoWsEndpoint());

        return "video";
    }

    private String getPublicIpAddress() {
        String ip = configurations.getDroneServerIp();
        return ip;
    }
}
