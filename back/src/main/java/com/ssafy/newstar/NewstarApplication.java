package com.ssafy.newstar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class NewstarApplication {
	public static void main(String[] args) {
		SpringApplication.run(NewstarApplication.class, args);
	}
}
