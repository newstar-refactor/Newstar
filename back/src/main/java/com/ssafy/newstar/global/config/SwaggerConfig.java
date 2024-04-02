package com.ssafy.newstar.global.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import java.util.Collections;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

  public static final String AUTHORIZATION_HEADER = "X-User-Id";

  @Bean
  public OpenAPI openAPI() {
    SecurityScheme securityScheme = new SecurityScheme()
        .type(SecurityScheme.Type.APIKEY)
        .in(SecurityScheme.In.HEADER).name(AUTHORIZATION_HEADER);
    SecurityRequirement securityRequirement = new SecurityRequirement().addList(
        AUTHORIZATION_HEADER, Collections.emptyList());

    return new OpenAPI()
        .components(new Components().addSecuritySchemes(AUTHORIZATION_HEADER, securityScheme))
        .security(Collections.singletonList(securityRequirement))
        .servers(Collections.singletonList(new Server().url("https://newstar.world/api")));
  }
}
