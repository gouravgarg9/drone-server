package com.droneserver.demo.configuration;

import com.droneserver.demo.controllers.VideoSocketHandler;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.server.standard.ServletServerContainerFactoryBean;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Configuration
@EnableWebSocket
public class WebSocketConfiguration implements WebSocketConfigurer {

    private final VideoSocketHandler videoSocketHandler;
    private final ConfigReader configurations;

    @Bean
    public ServletServerContainerFactoryBean createWebSocketContainer() {
        ServletServerContainerFactoryBean container = new ServletServerContainerFactoryBean();
        container.setMaxBinaryMessageBufferSize(1024000);
        return container;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(videoSocketHandler, configurations.getVideoWsEndpoint()).setAllowedOrigins("*");
    }
}